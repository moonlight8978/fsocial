module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      verified_user = User.find_by(id: extract_user_id_from_token)
      if verified_user.present?
        verified_user
      else
        reject_unauthorized_connection
      end
    end

    def extract_user_id_from_token
      token = request.params[:token]
      Auth::Jwt.decode(token).try('[]', :user_id)
    end
  end
end
