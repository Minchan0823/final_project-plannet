package plannet.final_project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import plannet.final_project.entity.Member;
import plannet.final_project.entity.Noti;
import plannet.final_project.entity.SCAL;

import java.util.List;

public interface NotiRepository extends JpaRepository<Noti,Long> {
    Noti findByUserIdAndReceiveId(Member send, Member receive);
    List<Noti> findByReceiveIdAndIsChecked(Member member, int isChecked);

    Noti findByReceiveIdAndIsCheckedAndCalNo(Member userId, int i, SCAL scal);
}
