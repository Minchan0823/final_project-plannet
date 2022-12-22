package plannet.final_project.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import plannet.final_project.entity.Board;
import plannet.final_project.service.BoardService;
import plannet.final_project.vo.BoardDTO;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    // Service 로직 연결
    private final BoardService boardService;

    // 전체 보드 리스트 불러오기
    @GetMapping("/list")
    // 전체조회기 때문에 boardList(@RequestParam) 으로 param 값을 받을 필요가 없음
    public ResponseEntity<List<BoardDTO>> boardList() {
        // 서비스를 다녀옴
        BoardDTO boardList = boardService.getBoardList();
        if(boardList.isOk()) return new ResponseEntity(boardList.getBoardList(), HttpStatus.OK);
        else return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
    }

    // 인기글 top3 목록 출력
    @GetMapping("/top3_list")
    public ResponseEntity<List<BoardDTO>> top3List() {
        BoardDTO top3List = boardService.getTop3List();
        if(top3List.isOk()) {
            return new ResponseEntity(top3List.getBoardList(), HttpStatus.OK);
        } else return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
    }

    // 검색 키워드에 해당하는 보드 리스트 불러오기
    @GetMapping("/search_list")
    public ResponseEntity<List<BoardDTO>> searchList(@RequestParam String keyword) {
        System.out.println(keyword);
        // 서비스를 다녀옴
        BoardDTO boardList = boardService.getSearchList("%%" + keyword + "%%");
        if(boardList.isOk()) {
            return new ResponseEntity(boardList.getBoardList(), HttpStatus.OK);
        } else return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
    }

    // 특정 보드넘버의 게시물 내용 불러오기 + 좋아요 수
    @GetMapping("/post_view")
    public ResponseEntity<List<Map<String, Object>>> postView(@RequestParam Long boardNo) {
        Map<String, Object> postViewData = new HashMap<>();
        List<Object> postViewList = new ArrayList<>();
        BoardDTO postView = boardService.getPostView(boardNo);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm");
        postViewData.put("boardNo", boardNo);
        postViewData.put("writerId", postView.getId());
        postViewData.put("category", postView.getCategory());
        postViewData.put("title", postView.getTitle());
        postViewData.put("nickname", postView.getNickname());
        postViewData.put("views", postView.getViews());
        postViewData.put("writeDate", postView.getWriteDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
        postViewData.put("detail", postView.getDetail());
        postViewData.put("isChecked", postView.getIsChecked());
        postViewList.add(postViewData);
        return new ResponseEntity(postViewList, HttpStatus.OK);
    }

    // boardNo의 게시물을 내가 작성하지 않았으면 조회수 +1
    @GetMapping("/views_up")
    public ResponseEntity<Integer> viewsUp(@RequestParam Long boardNo) {
        System.out.println("여긴옴?");
        boolean viewsChecked = boardService.getViews(boardNo);
        if (viewsChecked) {
            return new ResponseEntity(viewsChecked, HttpStatus.OK);
        } else {
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }
    }

    // boardNo에 해당하는 좋아요 수 구하기
    @GetMapping("/like_cnt")
    public ResponseEntity<Integer> likeCnt(@RequestParam Board boardNo) {
        int likeCnt = boardService.getLikeCnt(boardNo);
        return new ResponseEntity(likeCnt, HttpStatus.OK);
    }

    // boardNo로 내가 해당 게시물에 좋아요를 눌렀는지 조회하기
    @GetMapping("/like_checked")
    public ResponseEntity<Integer> likeChecked(@RequestParam String id, Board boardNo) {
        boolean likeChecked = boardService.getLikeChecked(id, boardNo);
        return new ResponseEntity(likeChecked, HttpStatus.OK);
    }

    // 좋아요 버튼을 눌렀을 때 toggle 밑 데이터베이스 변경
    @GetMapping("/like_checked_toggle")
    public ResponseEntity<Integer> likeCheckedToggle(@RequestParam String id, Board boardNo) {
        boolean likeCheckedToggle = boardService.likeCheckedToggle(id, boardNo);
        return new ResponseEntity(likeCheckedToggle, HttpStatus.OK);
    }

    // 자유게시판 댓글 불러오기
    @GetMapping("/comment_load")
    public ResponseEntity<List<Map<String, Object>>> commentLoad(@RequestParam Long boardNo, Long offsetNum, Long limitNum) {
//        System.out.println("컨트롤러 보드넘 : " + data.get("boardNo"));
//        System.out.println("컨트롤러 오프셋 : " + data.get("offsetNum"));
//        System.out.println("컨트롤러 리미트 : " + data.get("limitNum"));
//        Long num = data.get("boardNo");
//        Long offsetNum = data.get("offsetNum");
//        Long limitNum = data.get("limitNum");
        BoardDTO boardDTO = boardService.getCommentLoad(boardNo, offsetNum, limitNum);
        if(boardDTO.isOk()) {
            List<Map<String, Object>> commentList = boardDTO.getCommentsList();
            return new ResponseEntity(commentList, HttpStatus.OK);
        } else return new ResponseEntity(null, HttpStatus.OK);
    }

    // 자유게시판 댓글 작성하기
    @PostMapping("/comment_write")
    public ResponseEntity<Boolean> commentWrite(@RequestBody Map<String, Object> data) {
        Long boardNo = Long.parseLong((String)data.get("boardNo"));
        String id = (String)data.get("id");
        String detail = (String)data.get("detail");

        boolean commentWrite = boardService.commentWrite(boardNo, id, detail);
        if (commentWrite) {
            return new ResponseEntity(commentWrite, HttpStatus.OK);
        } else {
            return new ResponseEntity(commentWrite, HttpStatus.OK);
        }
    }

    // 자유게시판 댓글 삭제하기
    @PostMapping("/comment_delete")
    public ResponseEntity<Boolean> commentDelete(@RequestBody Map<String, Long> data) {
        Long commentNo = data.get("commentNo");
        boolean commentDelete = boardService.commentDelete(commentNo);
        if (commentDelete) {
            return new ResponseEntity(commentDelete, HttpStatus.OK);
        } else {
            return new ResponseEntity(commentDelete, HttpStatus.OK);
        }
    }

    // 자유게시판 글 작성
    @PostMapping("/board_write")
    public ResponseEntity<Long> boardWrite(@RequestBody Map<String, String> data) {
        String id = data.get("id");
        String category = data.get("category");
        String title = data.get("title");
        String detail = data.get("detail");
        int isChecked = 0;
        if (data.get("isChecked").equals("true")){
            isChecked = 1;
        }
        Long resultNo = boardService.boardWrite(id, category, title, detail, isChecked);
        return new ResponseEntity(resultNo, HttpStatus.OK);
    }

    // 자유게시판 글 수정
    @PostMapping("/board_edit")
    public ResponseEntity<Boolean> boardEdit(@RequestBody Map<String, String> data) {
        Long boardNo = Long.parseLong(data.get("num"));
        String category = data.get("category");
        String title = data.get("title");
        String detail = data.get("detail");
        boolean result = boardService.boardEdit(boardNo, category, title, detail);
        if(result) {
            return new ResponseEntity(true, HttpStatus.OK);
        }
        else {
            return new ResponseEntity(false, HttpStatus.OK);
        }
    }

    // 자유게시판 글 삭제하기
    @PostMapping("/board_delete")
    public ResponseEntity<Boolean> boardDelete(@RequestBody Map<String, String> data) {
        Long boardNo = Long.parseLong(data.get("num"));
        boolean result = boardService.boardDelete(boardNo);
        if(result) return new ResponseEntity(true, HttpStatus.OK);
        else return new ResponseEntity(false, HttpStatus.OK);
    }
}