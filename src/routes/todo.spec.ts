const TodoRauter = require("./TodoRauter"); // 테스트 하는 파일
const request = require("supertest"); // supertest 모듈 가져옴

// test 코드 작성
// test suit : describe
describe("GET /users는", () => {
    //test case : it
    it("should return 200 status code", (done) => {
        // 비동기의 해결로, 콜백함수에 파라미터로 done이라는 콜백함수를 넣어준다.
        // it의 첫번째 인자 : test 코드 설명
        // 콜백 : supersTest 실행 / 실제 test 코드
        request(TodoRauter)
            .get("/todo") // get으로 요청을 실제 보냄.
            .end((err, res) => {
                // end 콜백함수로 결과 확인.
                console.log(res.body); // 실제 데이터 - 배열이 찍히는지.
                done(); // done이라는  콜백함수 호출
            });
    });
});
