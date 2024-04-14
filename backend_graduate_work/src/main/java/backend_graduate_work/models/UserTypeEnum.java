package backend_graduate_work.models;

import lombok.Getter;

@Getter
public enum UserTypeEnum {
    FREELANCER("FREELANCER"),
    EMPLOYER("EMPLOYER");

    private final String userType;

    UserTypeEnum(String userType) {
        this.userType = userType;
    }
}
