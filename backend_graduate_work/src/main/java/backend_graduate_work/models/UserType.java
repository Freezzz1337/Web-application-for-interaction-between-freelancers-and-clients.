package backend_graduate_work.models;

import lombok.Getter;

@Getter
public enum UserType {
    FREELANCER("FREELANCER"),
    EMPLOYER("EMPLOYER");

    private final String userType;

    UserType(String userType) {
        this.userType = userType;
    }
}
