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