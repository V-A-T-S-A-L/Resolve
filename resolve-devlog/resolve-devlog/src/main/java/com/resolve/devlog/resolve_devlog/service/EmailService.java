package com.resolve.devlog.resolve_devlog.service;

public interface EmailService {
    void sendInvite(String to, String projectName, String inviterEmail);
}
