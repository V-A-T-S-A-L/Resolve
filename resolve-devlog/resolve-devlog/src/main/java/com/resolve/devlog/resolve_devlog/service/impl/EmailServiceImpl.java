package com.resolve.devlog.resolve_devlog.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.resolve.devlog.resolve_devlog.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendInvite(String to, String projectName, String inviterEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("vatsal.test.development@gmail.com");
        message.setTo(to);
        message.setSubject("Invitation to join project: " + projectName);
        message.setText(
                "Hello,\n\n" +
                        "You have been invited by " + inviterEmail + " to join the project \"" + projectName + "\".\n\n" +
                        "Click here to accept: http://localhost:5173/resolve\n\n" +
                        "Best regards,\nResolve App");

        mailSender.send(message);
    }
}
