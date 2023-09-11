// 확장자 종류에 맞는 아이콘과 프로그램 이름 모아두기
var programData = {
    "extensionType": [".ppt", ".doc"],
    
    ".ppt": {
            "Name": "파워포인트",
            "Icon": "../images/powerpoint.png"
            },
    ".doc": {
            "Name": "워드",
            "Icon": "../images/word.png"
            }
}

// + 버튼 눌렀을때 뜨는 프롬프트 상자
function inputExtension(){
    let ret = prompt("추가할 확장자명을 입력하세요.");
    
    if(ret != null && ret != ""){
        if(programData.extensionType.indexOf(ret) !== -1){
            createSmallFrame(ret);
        }
        else{
            console.log("없어요");
            ret = null;
        }
    }
}

// 프로그램 목록(확장자 목록)에 요소 하나 추가
function createSmallFrame(name){
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "program-small-frame");
    
    // 확장자 종류에 맞는 프로그램 이름과, 아이콘 가져오기
    var programName = programData[name].Name;
    var programIcon = programData[name].Icon;

    var smallGroup = document.createElement("div");
    smallGroup.setAttribute("class", "small-group");
    smallGroup.setAttribute("onclick", "programClick(this)");
    newDiv.appendChild(smallGroup);

    var img = document.createElement("img");
    img.setAttribute("class", "img");
    img.setAttribute("src", programIcon);
    smallGroup.append(img);

    var img = document.createElement("img");
    img.setAttribute("class", "x_img");
    img.setAttribute("src", "../images/x.png");
    img.setAttribute("onclick", "deleteProgram(event)");
    newDiv.appendChild(img);

    var txt = document.createElement("div");
    txt.setAttribute("class","programTxt");
    txt.innerHTML = programName
    smallGroup.appendChild(txt);

    var txt2 = document.createElement("div");
    txt2.setAttribute("class","programTxt2");
    txt2.innerHTML = name;
    smallGroup.appendChild(txt2);

    var parentDiv = document.getElementById("program-manage-frame");
    parentDiv.insertBefore(newDiv, parentDiv.lastElementChild)
}

//프로그램 목록에 요소 클릭했을 때 접근 허용 목록 띄우기
/*
function programClick(obj){
    var allClass = document.getElementsByClassName("small-group on");
    let count = allClass.length;

    let openList = document.getElementById("totalframe2");
    for(let i=0; i<count; i++){
        allClass[i].classList.remove("on");
        openList.style.display = "none";
    }
    
    obj.classList.add("on");
    openList.style.display = "inline-flex";
}
*/

// List.json 파일의 경로
const listJsonPath = '../json/List.json';

// 프로그램 목록 클릭 시 호출되는 함수
function programClick(obj) {
    var allClass = document.getElementsByClassName("small-group on");
    let count = allClass.length;

    let openList = document.getElementById("totalframe2");
    for (let i = 0; i < count; i++) {
        allClass[i].classList.remove("on");
        openList.style.display = "none";
    }

    obj.classList.add("on");
    
    // JSON 파일을 불러와서 접근 허용 목록을 생성
    /*
    fetch(listJsonPath)
        .then(response => response.json())
        .then(data => {
            createAccessList(data.Accept);
        })
        .catch(error => {
            console.error('Error loading List.json:', error);
        });

    openList.style.display = "inline-flex";
    */

    // 클릭한 요소의 programTxt2 값을 읽어옴
    const programTxt2 = obj.querySelector(".programTxt2").textContent;

    // JSON 파일을 불러와서 programTxt2 값을 키로 사용하여 데이터 찾기
    fetch(listJsonPath)
        .then(response => response.json())
        .then(data => {
            createAccessList(data[programTxt2]);

            // Delete 버튼 클릭 이벤트 핸들링
            const deleteButtons = document.querySelectorAll('.deleteIcon');
            deleteButtons.forEach((deleteButton, index) => {
                deleteButton.addEventListener('click', () => {
                    // 해당 목록 삭제
                    data[programTxt2].splice(index, 1);
                    
                    // 화면에서 해당 목록 삭제
                    const listFrame = deleteButton.closest('.listFrame');
                    listFrame.remove();

                    // JSON 데이터 업데이트 코드 필요 !!
                });
            });
        })
        .catch(error => {
            console.error('Error loading List.json:', error);
        });

    openList.style.display = "inline-flex";
}

// 접근 허용 목록을 생성하는 함수
function createAccessList(acceptList) {
    const accessListContainer = document.getElementById('access-list-container');
    
    // 이전 목록 삭제
    while (accessListContainer.firstChild) {
        accessListContainer.removeChild(accessListContainer.firstChild);
    }
    
    // Accept 배열을 순회하면서 목록을 생성
    acceptList.forEach(filePath => {
        // 파일 경로에서 마지막 "\\"까지의 부분 추출
        const fileName = filePath.split('\\').slice(-1)[0];

        const listFrame = document.createElement('div');
        listFrame.classList.add('listFrame');

        const listBlockFrame = document.createElement('div');
        listBlockFrame.classList.add('listBlockFrame');

        const exeNameFrame = document.createElement('div');
        exeNameFrame.classList.add('exeNameFrame');

        const exeIconFrame = document.createElement('div');
        exeIconFrame.classList.add('exeIconFrame');

        const iconImg = document.createElement('img');
        iconImg.style.width = '27px';
        iconImg.style.height = '28px';
        iconImg.src = '../images/fileicon.png';
        exeIconFrame.appendChild(iconImg);

        const filetext = document.createElement('div');
        filetext.classList.add('filetext');
        filetext.textContent = fileName;
        exeNameFrame.appendChild(exeIconFrame);
        exeNameFrame.appendChild(filetext);

        const deleteIcon = document.createElement('div');
        deleteIcon.classList.add('deleteIcon');

        const deleteImg = document.createElement('img');
        deleteImg.src = '../images/delete.png';
        deleteIcon.appendChild(deleteImg);

        listBlockFrame.appendChild(exeNameFrame);
        listBlockFrame.appendChild(deleteIcon);
        listFrame.appendChild(listBlockFrame);

        accessListContainer.appendChild(listFrame);

        const line = document.createElement('div');
        line.classList.add('line');
        accessListContainer.appendChild(line);
    });
}

// 프로그램 목록 X 버튼 누르면 삭제하기
function deleteProgram(e){
    let openList = document.getElementById("totalframe2");
    openList.style.display = "none";

    var clickElement = e.target;
    var smallFrame = clickElement.parentElement;
    smallFrame.remove();
}

// 드라이버 스타트 버튼
function start(obj){
    if(obj.innerHTML == "START"){
        obj.innerHTML = "STOP";
    }
    else{
        obj.innerHTML = "START";
    }
}