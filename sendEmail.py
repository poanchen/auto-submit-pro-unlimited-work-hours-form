import smtplib
import os

try:
  sender_gmail = os.environ['GMAIL_USERNAME']
except:
  print "No gmail username passed, aborting..."
  quit()

try:
  sender_gmail_password = os.environ['GMAIL_PASSWORD']
except:
  print "No gmail password passed, aborting..."
  quit()

receiver_email = 'receiver_email'
receiver_name = 'receiver_name'

def buildEmail():
  headers = "\r\n".join(["from: " + sender_gmail,
            "subject: Weekly update on Pro-unlimited work hours report",
            "to: " + receiver_email,
            "mime-version: 1.0",
            "content-type: text/html"])

  body_of_email = """
    Dear %s,<br><br>
    Please head over to <a href="/path/to/log/and/screenshot" target="_blank">here</a> to see your Pro-unlimited weekly work 
    hours report.<br><br>
    This message was intended to sent to %s.
  """ % (receiver_name, receiver_email)

  emailBody = headers + "\r\n\r\n" + body_of_email

  return emailBody

if __name__ == "__main__":
  try:
    server_ssl = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    # server_ssl.set_debuglevel(1)
    server_ssl.login(sender_gmail, sender_gmail_password)

    server_ssl.sendmail(sender_gmail, receiver_email, buildEmail())
    server_ssl.quit()
    print 'Succesully send the email to ' + receiver_email
  except:
    print 'Failed to send the email to ' + receiver_email