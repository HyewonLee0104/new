import workItemArr from "./data.js"; // 포폴 데이터

// 포폴 데이터 리스트
const workList = document.querySelector("ul.workList"); // 포폴리스트 ul.workList
const stickyElem = document.querySelector(".workWrapper");
const stickyElemParent = stickyElem.parentElement;
const bar = document.querySelector(".bar");

workItemArr.forEach((item)=> {
    let workItem = document.createElement("li");
    workItem.classList.add("workItem");
    workItem.innerHTML = `
        <a href="${item.link}" target="_blank">
            <img class="workImg" src="./img/${item.img}" alt="${item.name}" />
            <div class="workDesc">
                <h3>${item.name}</h3>
                <p>작업연도 : ${item.year}년</p>
                <p>소요기간 : ${item.period}</p>
                <p>사용스킬 : ${item.skill}</p>
                <p>플러그인 : ${item.plugin}</p>
                <p>기여도 : 100%</p>
            </div>
        </a>
    `

    workList.prepend(workItem);
});


// 포폴 리스트 & bar 가로 스크롤

let scrollY = 0, 
    percent = 0,
    mouseX = 0,
    targetX = 0,
    mouseY = 0,
    targetY = 0;
let stickyElemParentY = stickyElemParent.offsetTop,
    stickyElemParentHeight =  stickyElemParent.clientHeight,
    fixedLength = stickyElemParentY + stickyElemParentHeight - window.innerHeight;

window.addEventListener("resize", () => {
    stickyElemParentY = stickyElemParent.offsetTop;
    stickyElemParentHeight =  stickyElemParent.clientHeight;
    fixedLength = stickyElemParentY + stickyElemParentHeight - window.innerHeight;
})

window.addEventListener("scroll", () => {
    scrollY = window.scrollY;

    if ( scrollY >= stickyElemParentY && scrollY < fixedLength) {
        percent = (((scrollY - stickyElemParentY) / stickyElemParentHeight) * 100).toFixed(0);

        stickyElem.style.position = 'fixed';
        workList.style.transform = `translateX(${-percent}%)`;
        bar.style.width = `${((scrollY - stickyElemParentY) / stickyElemParentHeight) * 100}%`;
    } else if ( scrollY < stickyElemParentY ) {
        stickyElem.style.position = 'relative';
        workList.style.transform = `translateX(0)`;
        bar.style.width = `0`;
    } else {
        stickyElem.style.position = 'sticky';
        bar.style.width = `100%`;
    }
});


// 포폴 리스트 설명칸 애니메이션 방향 체크.
const workItem = document.querySelectorAll(".workItem");
const dirClassArr = ["in-left", "in-right", "out-left", "out-right"]; // 방향 클래스 리스트
let prevX = 0 // 이전 clientX 값
let delay = 100; // 방향 체크 주기

for( let i = 0; i < workItem.length; i++ ){
    workItem[i].addEventListener("mouseenter", (e) => {
        const xDir = prevX <= e.pageX ? "in-right" : "in-left";

        setTimeout(()=> {
            prevX = e.pageX;
        }, delay)
        
        if (xDir == "in-left") { // 오른쪽 -> 왼쪽 마우스 이동하면서 진입
            workItem[i].classList.remove(...dirClassArr);
            workItem[i].classList.add("in-left");
        } else { // 왼쪽 -> 오른쪽 마우스 이동하면서 진입
            workItem[i].classList.remove(...dirClassArr);
            workItem[i].classList.add("in-right");
        }

    });
    workItem[i].addEventListener("mouseleave", (e) => {
        const xDir = prevX <= e.pageX ? "out-right" : "out-left";

        setTimeout(()=> {
            prevX = e.pageX;
        }, delay)
        
        if (xDir == "out-left") { // 오른쪽 -> 왼쪽 마우스 이동하면서 나감
            workItem[i].classList.remove(...dirClassArr);
            workItem[i].classList.add(xDir);
        } else { // 왼쪽 -> 오른쪽 마우스 이동하면서 나감
            workItem[i].classList.remove(...dirClassArr);
            workItem[i].classList.add(xDir);
        }

    });
}


// particle 애니메이션
const particleWrapper = document.querySelector(".particleWrapper");
let particleNum = 30;

const getRandomColor = () => {
    let letters = '0123456789ABCDEF',
        color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
const getRandomNumber = (min, max) => {
    let randomNumber = Math.floor(Math.random()*(max-min+1) + min);
    return randomNumber;
};

for (let i = 0; i < particleNum; i++) {
    let size = getRandomNumber(4, 16),
        positionL = getRandomNumber(30, 100),
        animationName = `particle-move${getRandomNumber(1,2)}`,
        duration = getRandomNumber(15, 30),
        delay = getRandomNumber(0, 9);

    let newDiv = document.createElement("div");
    newDiv.classList.add("particle");

    newDiv.style.width = `${size}px`;
    newDiv.style.height = `${size}px`;
    newDiv.style.backgroundColor = `${getRandomColor()}`;
    newDiv.style.left = `${positionL}%`;

    newDiv.style.animationName = `${animationName}`;
    newDiv.style.animationDuration = `${duration}s`;
    newDiv.style.animationDelay = `${delay}s`

    particleWrapper.appendChild(newDiv);
}

