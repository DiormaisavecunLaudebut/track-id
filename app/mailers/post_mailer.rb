class PostMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #   en.post_mailer.post_found.subject

  def post_found
    @user = params[:user]
    @message = params[:message]
    @post = @message.post

    mail(
      to:       @user.email,
      subject:  "We've found you're track !"
    )
  end
end
