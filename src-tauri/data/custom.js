window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// ========== 原有：禁止新窗口跳转脚本 ==========
const hookClick = (e) => {    
  const origin = e.target.closest('a')    
  const isBaseTargetBlank = document.querySelector(        
    'head base[target="_blank"]'
  )    
  console.log('origin', origin, isBaseTargetBlank)    
  if (
    (origin && origin.href && origin.target === '_blank') ||
    (origin && origin.href && isBaseTargetBlank)
  ) {        
    e.preventDefault()        
    console.log('handle origin', origin)        
    location.href = origin.href
  } else {        
    console.log('not handle origin', origin)
  }
}
window.open = function (url, target, features) {    
  console.log('open', url, target, features)    
  location.href = url
}
document.addEventListener('click', hookClick, { capture: true })

// ========== 新增：鼠标跟随光圈特效 ==========
// 先创建样式（避免单独写CSS，直接嵌入JS）
const style1 = document.createElement('style');
style1.textContent = `
.mouse-light {
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(66,153,255,0.15) 0%, rgba(66,153,255,0) 70%);
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: 0.1s ease-out;
  z-index: -1;
}
`;
document.head.appendChild(style1);

// 创建光圈元素
const mouseLight = document.createElement('div');
mouseLight.className = 'mouse-light';
document.body.appendChild(mouseLight);

// 监听鼠标移动
document.addEventListener('mousemove', (e) => {
  mouseLight.style.left = e.clientX + 'px';
  mouseLight.style.top = e.clientY + 'px';
});

// ========== 新增：滚动渐入动画特效 ==========
// 创建滚动渐入样式
const style2 = document.createElement('style');
style2.textContent = `
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-in.active {
  opacity: 1;
  transform: translateY(0);
}
`;
document.head.appendChild(style2);

// 滚动监听逻辑
document.addEventListener('DOMContentLoaded', function () {
  const fadeElements = document.querySelectorAll('.fade-in');
  function checkScroll() {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.85;
      if (isVisible) el.classList.add('active');
    });
  }
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // 初始检查
});
