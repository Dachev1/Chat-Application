package dev.dachev.chat.chat.dto;

import dev.dachev.chat.chat.enums.MessageType;
import lombok.*;
import org.springframework.stereotype.Service;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ChatMessageDTO {

    private String content;
    private String sender;
    private MessageType type;
}
