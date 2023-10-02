let selectedProgramTxt2;

// List.json 파일의 경로
const listJsonPath = "C://WRDP_MiniFilter//List.json";

const txt = [];
const doc = ["C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Word.exe"];
const ppt = ["C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\PowerPoint.exe"];
const none = [];

// 확장자 종류에 맞는 아이콘과 프로그램 이름 모아두기
var programData = {
    "extensionType": [".ppt", ".doc", ".txt", ".hwp", ".xlxs"],
    
    ".ppt": {
            "Name": "파워포인트",
            "Icon": "./images/powerpoint.png"
            },
    ".doc": {
            "Name": "워드",
            "Icon": "./images/word.png"
            },
    ".txt": {
            "Name": "메모장",
            "Icon": "./images/textFile.png"
            },
    ".hwp": {   
            "Name": "한컴오피스",
            "Icon": "./images/hwp.png"
            },
    ".xlxs": {
            "Name": "엑셀",
            "Icon": "./images/excel.png"
            }
}

function inputExtension(){
    const openDialog = document.getElementById("addExtension");
    const enterButton = document.getElementById("enter");
    const cancelButton = document.getElementById("cancel");
    const extensionText = document.getElementById("extensionText");

    openDialog.show();
    
    enterButton.addEventListener("click", () => {
        var extension = extensionText.value;
        if(extension != null && extension != ""){
            if(programData.extensionType.indexOf(extension) !== -1){
                createSmallFrame(extension);
                extensionText.value = "";
                openDialog.close();
            }  
            else{
                console.log("없어요");
                extension =  null;
                openDialog.close();
            }
        }
    });

    cancelButton.addEventListener("click", () => {
        extensionText.value = "";
        openDialog.close();
    })
}


// + 버튼 눌렀을때 뜨는 프롬프트 상자
// function inputExtension(){
//     let ret = prompt("추가할 확장자명을 입력하세요.");
    
//     if(ret != null && ret != ""){
//         if(programData.extensionType.indexOf(ret) !== -1){
//             createSmallFrame(ret);
//         }
//         else{
//             console.log("없어요");
//             ret = null;
//         }
//     }
// }

function inputProgramPath(){
    const openDialog = document.getElementById("addProgram");
    const enterButton = document.getElementById("enter2");
    const cancelButton = document.getElementById("cancel2");
    const extensionText = document.getElementById("ProgramText");

    openDialog.show();

    enterButton.addEventListener("click", () => {
        var program = ProgramText.value;
        if(program != null && program != ""){
            if (selectedProgramTxt2 == ".doc") {
                doc.push(program);
                createAccessList(doc);
            }
            else if (selectedProgramTxt2 == ".ppt") {
                ppt.push(program);
                createAccessList(ppt);
            }
            else if (selectedProgramTxt2 == ".txt") {
                txt.push(program);
                createAccessList(txt);
            }
            ProgramText.value = "";
            openDialog.close();
        }
    });

    cancelButton.addEventListener("click", () => {
        ProgramText.value = "";
        openDialog.close();
    })
}
// + 버튼 눌렀을때 뜨는 프롬프트 상자 - 접근 허용 목록
// function inputProgramPath(){
//     let newData = prompt("허용할 프로그램의 경로를 입력하세요.");
    
//     if(newData != null && newData != ""){
//         fetch(listJsonPath)
//         .then(response => response.json())
//         .then(data => {
//             if (data.hasOwnProperty(selectedProgramTxt2)) {
//             if (Array.isArray(data[selectedProgramTxt2])) {
//                 data[selectedProgramTxt2].push(newData);
//             } else {
//                 data[selectedProgramTxt2] = [data[selectedProgramTxt2], newData];
//             }
//             } else {
//             data[selectedProgramTxt2] = newData;
//             }
//             // 변경된 JSON 데이터를 다시 파일로 저장, 화면에 목록으로 생성 필요 !!
//         })
//         .catch(error => {
//             console.error('[inputProgramPath] load json fail: ', error);
//         });
//         newData = null;
//     }
// }


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
    img.setAttribute("src", "./images/x_img.png");
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
    selectedProgramTxt2 = obj.querySelector(".programTxt2").textContent;

    if (selectedProgramTxt2 == ".doc") {
        createAccessList(doc);
        // Delete 버튼 클릭 이벤트 핸들링
        const deleteButtons = document.querySelectorAll('.deleteIcon');
        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                // 해당 목록 삭제
                doc.splice(index, 1);
                            
                // 화면에서 해당 목록 삭제
                const listFrame = deleteButton.closest('.listBlockFrame');
                listFrame.remove();
            })
        });
    }
    else if (selectedProgramTxt2 == ".ppt") {
        createAccessList(ppt);
        // Delete 버튼 클릭 이벤트 핸들링
        const deleteButtons = document.querySelectorAll('.deleteIcon');
        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                // 해당 목록 삭제
                ppt.splice(index, 1);
                            
                // 화면에서 해당 목록 삭제
                const listFrame = deleteButton.closest('.listBlockFrame');
                listFrame.remove();
            })
        });
    }
    else if (selectedProgramTxt2 == ".txt") {
        createAccessList(txt);
        // Delete 버튼 클릭 이벤트 핸들링
        const deleteButtons = document.querySelectorAll('.deleteIcon');
        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                // 해당 목록 삭제
                txt.splice(index, 1);
                            
                // 화면에서 해당 목록 삭제
                const listFrame = deleteButton.closest('.listBlockFrame');
                listFrame.remove();
            })
        });
    }
    else createAccessList(none);

    /*
    // JSON 파일을 불러와서 programTxt2 값을 키로 사용하여 데이터 찾기
    fetch(listJsonPath)
        .then(response => response.json())
        .then(data => {
            createAccessList(data[selectedProgramTxt2]);

            // Delete 버튼 클릭 이벤트 핸들링
            const deleteButtons = document.querySelectorAll('.deleteIcon');
            deleteButtons.forEach((deleteButton, index) => {
                deleteButton.addEventListener('click', () => {
                    // 해당 목록 삭제
                    data[selectedProgramTxt2].splice(index, 1);
                    
                    // 화면에서 해당 목록 삭제
                    const listFrame = deleteButton.closest('.listBlockFrame');
                    listFrame.remove();

                    // JSON 데이터 업데이트 코드 필요 !!
                });
            });
        })
        .catch(error => {
            console.error('[programClick] load json fail: ', error);
        });
        */

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

        const listBlockFrame = document.createElement('div');
        listBlockFrame.classList.add('listBlockFrame');

        const exeNameFrame = document.createElement('div');
        exeNameFrame.classList.add('exeNameFrame');

        const iconImg = document.createElement('img');
        iconImg.style.width = '21px';
        iconImg.style.height = '24px';
        iconImg.src = './images/fileicon.png';
        exeNameFrame.appendChild(iconImg);

        const filetext = document.createElement('div');
        filetext.classList.add('filetext');
        filetext.textContent = fileName;
        exeNameFrame.appendChild(filetext);

        const deleteIcon = document.createElement('img');
        deleteIcon.classList.add('deleteIcon');
        deleteIcon.src = "./images/delete.png";

        listBlockFrame.appendChild(exeNameFrame);
        listBlockFrame.appendChild(deleteIcon);
    
        accessListContainer.appendChild(listBlockFrame);

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
        Drv = window.open("Dev://"); // 사전 세팅 안 하면 실행 안 됨 !!
        Drv.close();
    }
    else{
        obj.innerHTML = "START";
    }
}

function w_update(obj) {
    if (obj.innerHTML == "화이트리스트 업데이트") {
        obj.innerHTML = "업데이트 중";
        wlist = window.open("wlist://");

        setTimeout(function () {
            obj.innerHTML = "화이트리스트 업데이트";
        }, 1000); 
        wlist.close();
    }
}

// 설명서 
function open_instruction(){
    let count = 1;

    let instruction = document.getElementById("instruction-board");
    instruction.style.display = "block";
    
    let closeButton = document.getElementById("close_instruction");
    let backButton = document.getElementById("back-instruction");
    let nextButton = document.getElementById("next-instruction");
    nextButton.style.display = "block";
    updateInstruction(count);

    backButton.addEventListener("click",
        function(){ 
            if(count > 1){
                count--;
            }
            else{
                count = 1;
            }
            updateInstruction(count);
        });
    
    nextButton.addEventListener("click",
        function(){ 
            if(count < 4){
                count++;
            }
            else{
                count = 4;
            }
            updateInstruction(count);
    });
    
    closeButton.addEventListener("click",
                                function(){ instruction.style.display = "none"; });
}

function updateInstruction(count) {
    let instruction_img = document.getElementById("instruction-img");
    let instruction_content = document.getElementById("instruction-content");

    let backButton = document.getElementById("back-instruction");
    let nextButton = document.getElementById("next-instruction");

    if (count == 1) {
        backButton.style.display = "none";
        instruction_img.src = "./images/instruction1.png";
        instruction_content.innerText = "1. 좌측의 프로그램 리스트에서 관리할 파일을 선택하세요.";
    }
    if (count == 2) {
        backButton.style.display = "block";
        nextButton.style.display = "block";
        instruction_img.setAttribute("src", "./images/instruction2.png");
        instruction_content.innerText = "2. 만약, doc 파일에 관한 관리 목록을 보고 싶다면 Word 아이콘을 선택합니다.";
    }
    if (count == 3) {
        backButton.style.display = "block";
        nextButton.style.display = "block";
        instruction_img.src = "./images/instruction3.png";
        instruction_content.innerText = "3. 우측에 뜬 접근 허용 목록을 확인하고 추가 및 제거합니다.";
    }
    if (count == 4) {
        nextButton.style.display = "none";
        backButton.style.display = "block";
        instruction_img.src = "./images/instruction4.png";
        instruction_content.innerText = "4. 사용자 맞춤 목록을 원한다면, AI 맞춤 모드를 클릭하세요."
    }
}
