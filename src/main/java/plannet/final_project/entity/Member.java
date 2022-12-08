package plannet.final_project.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@ToString
@Entity
public class Member {
    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 5)
    private String userCode;

    @Column(nullable = false, length = 20)
    private String pwd;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false, unique = true, length = 20)
    private String nickname;

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Column(unique = true, length = 30)
    private String tel;

    // 자바는 카멜표기법을 따르지만 DB에서는 그렇지 않아서 JOIN_DATE 로 생성됨
    @CreatedDate
    private LocalDateTime joinDate;

    @Column(length = 300)
    private String profile;

    @Column(length = 2400)
    private String memo;

    @Column(length = 200)
    private String proImg;

    @Column(length = 1) // 소셜로 가입한 사람인지 기록하는 컬럼
    private String social;

    @OneToMany(mappedBy = "userId", cascade = {CascadeType.ALL}, orphanRemoval=true)
    private List<SPLAN> splans;
    @OneToMany(mappedBy = "userId", cascade = {CascadeType.ALL}, orphanRemoval=true)
    private List<SCAL> scals;
    @OneToMany(mappedBy = "userId", cascade = {CascadeType.ALL}, orphanRemoval=true)
    private List<SCOM> scoms;
    @OneToMany(mappedBy = "userId", cascade = {CascadeType.ALL}, orphanRemoval=true)
    private List<SMEM> smems;
}