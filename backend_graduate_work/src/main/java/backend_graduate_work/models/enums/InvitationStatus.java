package backend_graduate_work.models.enums;

import lombok.Getter;

@Getter
public enum InvitationStatus {
    PENDING("PENDING"),
    ACCEPTED("ACCEPTED"),
    UPDATED("UPDATED"),
    DECLINED("DECLINED"),
    COMPLETED("COMPLETED");

    private final String status;

    InvitationStatus(String status) {
        this.status = status;
    }
}