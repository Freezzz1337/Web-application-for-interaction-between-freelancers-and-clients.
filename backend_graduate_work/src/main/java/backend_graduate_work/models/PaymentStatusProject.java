package backend_graduate_work.models;

import lombok.Getter;

@Getter
public enum PaymentStatusProject {
    PENDING("PENDING"),
    PAID("PAID"),
    DISPUTED("DISPUTED");

    private final String paymentStatus;

    PaymentStatusProject(String paymentStatus){
        this.paymentStatus = paymentStatus;
    }
}
