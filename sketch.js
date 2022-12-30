var colors = "fae37c-dc9dfa-3198e6-fdaae0-5add77-fa625f".split("-").map(a=>"#"+a)//輸入6個顏色，並設為變數
var colors_r = "ff6d00-ff7900-ff8500-ff9100-ff9e00-240046-3c096c-5a189a-7b2cbf-9d4edd".split("-").map(a=>"#"+a)
var clr,clr_r
//宣告陣列資料，記錄每一朵花的基本資料
var positionListX =[]  //所有花的X軸位置，List串列，array陣列
var positionListY =[]  //所有花的Y軸位置
var clrList=[]      //所有花瓣顏色
var clr_r_List = []  //所有花圓心顏色
var sizeList =[]  //所有花的大小

// var face_num,face_x,face_y,face_size
var face_num = 1
var face_size = []
var face_x =[]
var face_y = []


// var song //宣告變數song
// var songIsplay=false //宣告變數songIsplay=false
// var amp //宣告變數amp
// var vol=0 //宣告變數vol=0
// var m_x,m_y //宣告變數m_x,m_y
// var music_btn,mouse_btn,Speech_btn //宣告變數music_btn,mouse_btn,Speech_btn
// var mosueIsplay=true //宣告變數mosueIsplay=true
// var myRec = new p5.SpeechRec(); //宣告變數myRec = new p5.SpeechRec();
// var result //宣告變數result
// var clr=[] //宣告變數clr=[]

//++++++++++手勢辨識_變數宣告區++++++++++++++++++++++++
let handpose;
let video;  //攝影機取得影像，放影像資料
let predictions = [];  //紀錄所有手勢21點所有資料
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d //後面變數名稱有8代表食指最上端，4代表大拇指的最上端。大寫的X、Y、Z手指所在的座標，d代表為4與8點的距離(只有取xy軸)
let pointerX14,pointerY14,pointerX16,pointerY16  //用四個變數紀錄第14點(pointerX14,pointerY14)，16點的X，Y(pointerX16,pointerY16)
//++++++++++++++++++++++++++++++++++++++++++++++++++++


// function preload(){
//   song = loadSound("chi-la-ameng-zhu-ti-qu.mp3");
// }



function setup() {
  createCanvas(windowWidth, windowHeight); //設定畫布大小為視窗寬高
  //angleMode(DEGREES) //去銳邊
  

  // music_btn = createButton("play") //設定按鈕(play)
  // music_btn.position(width*5/13,height*8/9) //設定按鈕(位置width*5/13,height*8/9)
  // music_btn.size(100,60); //設定按鈕(大小100,60)
  // music_btn.style('background-color', '#c2c5aa'); //設定按鈕(背景:#c2c5aa)
  // music_btn.style('font-size', '20x'); //設定按鈕(文字大小20)
  // music_btn.style('color', 'white'); //設定按鈕(文字顏色白色)
  // music_btn.mousePressed(music_btn_pressed) //設定按鈕(music_btn_pressed)


  // mouse_btn = createButton("pause")//設定按鈕(pause)
  // mouse_btn.position(width*1/2,height*8/9)//設定按鈕(座標:width*1/2,height*8/9)
  // mouse_btn.size(100,60); //設定按鈕(大小350<100)
  // mouse_btn.style('background-color', '#c2c5aa'); //設定按鈕(背景:#c2c5aa)
  // mouse_btn.style('font-size', '20px'); //設定按鈕(文字大小20)
  // mouse_btn.style('color', 'white'); //設定按鈕(文字顏色白色)
  // mouse_btn.mousePressed(mouse_btn_pressed) //設定按鈕(music_btn_pressed)

  // Speech_btn = createButton("語音辨識(跳舞/不要跳)") //設定按鈕(語音辨識(跳舞/不要跳))
  // Speech_btn.position(width*8/13,height*8/9) //設定按鈕(座標:width*8/13,height*8/9)
  // Speech_btn.size(100,60); //設定按鈕(大小350,100)
  // Speech_btn.style('background-color', '#c2c5aa'); //設定按鈕(背景:#c2c5aa)
  // Speech_btn.style('font-size', '10px'); //設定按鈕(文字大小32)
  // Speech_btn.style('color', 'white'); //設定按鈕(文字顏色白色)
  // Speech_btn.mousePressed(Speech_btn_pressed)//設定按鈕(Speech_btn_pressed)

  for(var j=0;j<1;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)
    //紀錄資料
    positionListX.push(random(width)) //把花X位置存入到positionListX list資料內
    positionListY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
    sizeList.push(random(0.5,1.5))
    //畫圖
    push() 
      translate(positionListX[j],positionListY[j]) //花的座標，原點移到視窗的中心點
      clr = clrList[j]
      clr_r = clr_r_List[j]
      drawFlower(clr,clr_r,sizeList[j]) //畫花
		
		  for(var i=0;i<face_num;i++){ //設定迴圈，讓臉變多
        face_size[i] = 100  //臉的大小100~400
        face_x[i] = positionListX[j] //臉的x軸在視窗寬除以2
        face_y[i] = positionListY[j] //臉的x軸在視窗寬除以2
        
      }
		
    pop()
    }

    //+++++++++++++取得攝影機影像並連線手勢辨識+++++++++++++++++++++
	
		video = createCapture(VIDEO);  //取得攝影機的影像，影像的畫面存到video
		video.size(width, height);  //影像的大小為整個視窗大小

		handpose = ml5.handpose(video, modelReady);  //把video影像執行手辨識，辨識完畢會去執行modelReady function

  	// This sets up an event that fills the global variable "predictions"
  	// with an array every time new hand poses are detected
		handpose.on("predict", (results) => {  
    		predictions = results;   //手勢辨識後的結果放到predictions變數內
		}); 

  	// Hide the video element, and just show the canvas
		video.hide();  //隱藏video
		//+++++++++++++++++++++++++++++++++++++++++++++++++++++++	





  // for(var i=0;i<face_num;i++){ //設定迴圈，讓臉變多
  //   face_size[i] = random(20,100) //亂數臉的大小20~100
  //   face_x[i] = random(0,width) //臉亂數0~寬
  //   face_y[i] = random(0,height) //臉亂數0~高
  //   clr[i] = colors[int(random(0,colors.length))] //取亂數從0到顏色長度
  // } 
}

function modelReady() {
  console.log("Model ready!"); //說攝影機OK
}


function draw() {  //一秒進到function執行60次
  //攝影機反向
  translate(width, 0);
  scale(-1, 1);
  //+++++++++
	background(255); //設背景
	
	image(video,0,0,width,height)
	
	d= dist(pointerX8,pointerY8,pointerX4,pointerY4) //算出大拇指與食指上端的距離
	
  for(var j=0;j<positionListY.length;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)    
    //畫圖
    // push()  
    //   translate(positionListY[j],positionListX[j]) //花的座標，原點移到視窗的中心點
    //   rotate(frameCount/70)  //旋轉指令，每次進到draw()，framecount，每次進到draw()，frameCount就會+1
    //   clr = clrList[j]
    //   clr_r = clr_r_List[j]
    //   drawFlower(clr,clr_r,map(mouseX,0,width,sizeList[j],sizeList[j]+1)) 
    // pop()
		// rotate(frameCount/70)  //旋轉指令，每次進到draw()，framecount，每次進到draw()，frameCount就會+1
		r_Flower(clrList[j], clr_r_List[j],sizeList[j],positionListX[j],positionListY[j]) 
    }
  drawKeypoints();
}
// function music_btn_pressed(){ //開始音樂
//     song.stop()//音樂停止
//     song.play()//音樂播放
//     songIsplay = true//如果音樂撥放為真
//     amp=new p5.Amplitude()//放音樂
//     music_btn.style('background-color', '#3a5a40')//設定按鈕顏色 
//   mouse_btn.style('background-color', '#c2c5aa')//設定按鈕顏色 
//   Speech_btn.style('background-color', '#c2c5aa')//設定按鈕顏色 
    
// }

// function mouse_btn_pressed(){ //暫停
//   song.pause()//音樂暫停
//   songIsplay = false//如果音樂撥放為否
//   music_btn.style('background-color', '#c2c5aa')//設定按鈕顏色 
//   mouse_btn.style('background-color', '#3a5a40')//設定按鈕顏色 
//   Speech_btn.style('background-color', '#c2c5aa')//設定按鈕顏色 
// }


// function Speech_btn_pressed(){ //語音說話
//   music_btn.style('background-color', '#c2c5aa')//設定按鈕顏色 
//   mouse_btn.style('background-color', '#c2c5aa')//設定按鈕顏色 
//   Speech_btn.style('background-color', '#3a5a40')//設定按鈕顏色 
//   myRec.onResult = showResult;
//   myRec.start();  

// }


// function showResult() //語音說話2
// {
// 	if(myRec.resultValue==true) {
// 	     result = myRec.resultString
//          if(myRec.resultString==="跳舞")
//             {
//                 music_btn_pressed()
//              }
//          if(myRec.resultString==="不要跳")
//             {
 
//               mouse_btn_pressed()
//              }
// 	}
// }

function drawFlower(clr,clr_r,size=1){  //clr:花瓣顏色，clr_r:花圓心顏色，size:花大小
  
	for(var j=0;j<face_num;j++){
    var f_s = face_size[j] //宣告f_s為face_size[j]
        // translate(face_x[j],face_y[j]) //把(0,0)座標原點移到視窗的中間
        fill(clr) //上臉色2a9d8f
        
	}
  push()
    
    scale(size=0.7)    //縮放，size=1，100%顯示，0.5，50%顯示
    fill(clr)
      ellipse(0,0,f_s/0.345) //臉(藍色部分) 
      // push()

      // rotate(25)
      // arc(f_s/0.6,f_s/0.8,f_s/1.5,f_s/0.4,180,360,OPEN) //右手臂
      // rotate(-50)
      // arc(-f_s/0.6,f_s/0.8,f_s/1.5,f_s/0.4,180,360,OPEN) //左手臂
      
      // pop()
  
      // fill(255)
      // ellipse(f_s/0.658,f_s/1.4,f_s/1.5) //右手掌
      // ellipse(-f_s/0.658,f_s/1.4,f_s/1.5) //左手掌

      fill(255)
      ellipse(0,f_s/3.03,f_s/0.408,f_s/0.435) //臉(白色部分) 
      ellipse(-f_s/2.857,-f_s/1.316,f_s/1.429,f_s/1.111) //左眼白 
      ellipse(f_s/2.857,-f_s/1.316,f_s/1.429,f_s/1.111) //右眼白  
      
      fill(0)
      ellipse(-f_s/4+map(mouseX,0,width,-f_s/4.33,f_s/10),-f_s/1.72+map(mouseY,0,height,-f_s/3.222,f_s/12),f_s/5.882,f_s/3.704) //左眼球
      ellipse(f_s/4+map(mouseX,0,width,-f_s/10,f_s/4.33),-f_s/1.72+map(mouseY,0,height,-f_s/3.222,f_s/12),f_s/5.882,f_s/3.704) //右眼球
      
      fill(255)
      ellipse(-f_s/4.35+map(mouseX,0,width,-f_s/4.33,f_s/10),-f_s/1.69+map(mouseY,0,height,-f_s/3.222,f_s/12),f_s/11.11,f_s/7.143) //左眼睛亮光
      ellipse(f_s/4.35+map(mouseX,0,width,-f_s/10,f_s/4.33),-f_s/1.69+map(mouseY,0,height,-f_s/3.222,f_s/12),f_s/11.11,f_s/7.143) //右眼睛亮光
      
      fill('#DD0303')
      ellipse(0,-f_s/3.03,f_s/2.63,f_s/2.63) //鼻子(紅色)
      fill(255)
      ellipse(f_s/33.34,-f_s/2.38,f_s/8.334) //鼻子高光
  
      curve(f_s/1.818,-f_s/5.556,f_s/1.818,-f_s/5.556,f_s/0.862,-f_s/2.128,f_s/0.87,-f_s/2.128)
      curve(f_s/1.667,-f_s/100,f_s/1.667,-f_s/100,f_s/0.746,-f_s/7.692,f_s/0.87,-f_s/7.143)
      curve(f_s/1.613,f_s/5,f_s/1.613,f_s/5,f_s/0.73,f_s/4.167,f_s/0.87,f_s/3.571)
      //右邊鬍鬚
      curve(-f_s/1.818,-f_s/5.556,-f_s/1.818,-f_s/5.556,-f_s/0.862,-f_s/2.128,-f_s/0.87,-f_s/2.128)
      curve(-f_s/1.667,-f_s/100,-f_s/1.667,-f_s/100,-f_s/0.746,-f_s/7.692,-f_s/0.87,-f_s/7.143)
      curve(-f_s/1.613,f_s/5,-f_s/1.613,f_s/5,-f_s/0.73,f_s/4.167,-f_s/0.87,f_s/3.571)
      //左邊鬍鬚


      fill(255,0,0)
      rect(-f_s/1.334,f_s/0.787,f_s/0.667,f_s/5,f_s/5) //紅領繩
      fill(255,255,0)
      ellipse(0,f_s/0.633,f_s/2.857,f_s/2.857) //鈴鐺
      rect(-f_s/5,f_s/0.645,f_s/2.5,f_s/25,f_s/5)  //鈴鐺中間橫線
      fill('#897900')
      ellipse(0,f_s/0.602,f_s/12.5) //鈴鐺孔

      beginShape();
        curveVertex(0,f_s/0.588)
        curveVertex(0,f_s/0.588)
        curveVertex(0,f_s/0.571)
        curveVertex(0,f_s/0.571)
    endShape(); //鈴鐺中間

    beginShape();
        curveVertex(0,-f_s/6.667)
        curveVertex(0,-f_s/6.667)
        curveVertex(0,f_s/1.176)
        curveVertex(0,f_s/1.176)
    endShape(); //嘴巴中間
    beginShape();
        curveVertex(-f_s/1,f_s/2.631)
        curveVertex(-f_s/1,f_s/2.631)
        curveVertex(0,f_s/1.176)
        curveVertex(0,f_s/1.176)
    endShape(); //左嘴巴
    beginShape();
        curveVertex(f_s/1,f_s/2.631)
        curveVertex(f_s/1,f_s/2.631)
        curveVertex(0,f_s/1.176)
        curveVertex(0,f_s/1.176)
    endShape(); //右嘴巴
    
  pop()    
}


// function draw() {
//   background('#e3d5ca');//背景色#e3d5ca
//   textSize(50) //設文字大小50
//   text("X:"+mouseX+"  Y:"+mouseY,50,50) //文字在50,50的位置顯示X、Y軸座標
//   for(var j=0;j<face_num;j++){ //設定迴圈，讓臉變多
//     fill('#F1E2AB')
//     ellipse(275+map(mouseX,0,width,-100,700),140+map(mouseY,0,height,-80,400),80)  //銅鑼燒底層
//     fill('#BF6900')
//     ellipse(275+map(mouseX,0,width,-100,700),140+map(mouseY,0,height,-80,400),65)  //銅鑼燒中間
//     push()  
     
//       var f_s = face_size[j] //宣告f_s為face_size[j]
//       translate(face_x[j],face_y[j]) //把(0,0)座標原點移到視窗的中間
//       fill(clr[j])
//       ellipse(0,0,f_s/0.345) //臉(藍色部分) 
//       push()

//       rotate(25)
//       arc(f_s/0.6,f_s/0.8,f_s/1.5,f_s/0.4,180,360,OPEN) //右手臂
//       rotate(-50)
//       arc(-f_s/0.6,f_s/0.8,f_s/1.5,f_s/0.4,180,360,OPEN) //左手臂
      
//       pop()
  
//       fill(255)
//       ellipse(f_s/0.658,f_s/1.4,f_s/1.5) //右手掌
//       ellipse(-f_s/0.658,f_s/1.4,f_s/1.5) //左手掌

//       fill(255)
//       ellipse(0,f_s/3.03,f_s/0.408,f_s/0.435) //臉(白色部分) 
//       ellipse(-f_s/2.857,-f_s/1.316,f_s/1.429,f_s/1.111) //左眼白 
//       ellipse(f_s/2.857,-f_s/1.316,f_s/1.429,f_s/1.111) //右眼白  
      
//       fill(0)
//       ellipse(-f_s/4+map(mouseX,0,width,-f_s/4.33,f_s/10),-f_s/1.72+map(mouseY,0,height,-f_s/3.222,f_s/12),f_s/5.882,f_s/3.704) //左眼球
//       ellipse(f_s/4+map(mouseX,0,width,-f_s/10,f_s/4.33),-f_s/1.72+map(mouseY,0,height,-f_s/3.222,f_s/12),f_s/5.882,f_s/3.704) //右眼球
      
//       fill(255)
//       ellipse(-f_s/4.35+map(mouseX,0,width,-f_s/4.33,f_s/10),-f_s/1.69+map(mouseY,0,height,-f_s/3.222,f_s/12),f_s/11.11,f_s/7.143) //左眼睛亮光
//       ellipse(f_s/4.35+map(mouseX,0,width,-f_s/10,f_s/4.33),-f_s/1.69+map(mouseY,0,height,-f_s/3.222,f_s/12),f_s/11.11,f_s/7.143) //右眼睛亮光
      
//       fill('#DD0303')
//       ellipse(0,-f_s/3.03,f_s/2.63,f_s/2.63) //鼻子(紅色)
//       fill(255)
//       ellipse(f_s/33.34,-f_s/2.38,f_s/8.334) //鼻子高光
  
//       curve(f_s/1.818,-f_s/5.556,f_s/1.818,-f_s/5.556,f_s/0.862,-f_s/2.128,f_s/0.87,-f_s/2.128)
//       curve(f_s/1.667,-f_s/100,f_s/1.667,-f_s/100,f_s/0.746,-f_s/7.692,f_s/0.87,-f_s/7.143)
//       curve(f_s/1.613,f_s/5,f_s/1.613,f_s/5,f_s/0.73,f_s/4.167,f_s/0.87,f_s/3.571)
//       //右邊鬍鬚
//       curve(-f_s/1.818,-f_s/5.556,-f_s/1.818,-f_s/5.556,-f_s/0.862,-f_s/2.128,-f_s/0.87,-f_s/2.128)
//       curve(-f_s/1.667,-f_s/100,-f_s/1.667,-f_s/100,-f_s/0.746,-f_s/7.692,-f_s/0.87,-f_s/7.143)
//       curve(-f_s/1.613,f_s/5,-f_s/1.613,f_s/5,-f_s/0.73,f_s/4.167,-f_s/0.87,f_s/3.571)
//       //左邊鬍鬚


//       fill(255,0,0)
//       rect(-f_s/1.334,f_s/0.787,f_s/0.667,f_s/5,f_s/5) //紅領繩
//       fill(255,255,0)
//       ellipse(0,f_s/0.633,f_s/2.857,f_s/2.857) //鈴鐺
//       rect(-f_s/5,f_s/0.645,f_s/2.5,f_s/25,f_s/5)  //鈴鐺中間橫線
//       fill('#897900')
//       ellipse(0,f_s/0.602,f_s/12.5) //鈴鐺孔

//       beginShape();
//         curveVertex(0,f_s/0.588)
//         curveVertex(0,f_s/0.588)
//         curveVertex(0,f_s/0.571)
//         curveVertex(0,f_s/0.571)
//     endShape(); //鈴鐺中間

//     beginShape();
//         curveVertex(0,-f_s/6.667)
//         curveVertex(0,-f_s/6.667)
//         curveVertex(0,f_s/1.176)
//         curveVertex(0,f_s/1.176)
//     endShape(); //嘴巴中間
//     beginShape();
//         curveVertex(-f_s/1,f_s/2.631)
//         curveVertex(-f_s/1,f_s/2.631)
//         curveVertex(0,f_s/1.176)
//         curveVertex(0,f_s/1.176)
//     endShape(); //左嘴巴
//     beginShape();
//         curveVertex(f_s/1,f_s/2.631)
//         curveVertex(f_s/1,f_s/2.631)
//         curveVertex(0,f_s/1.176)
//         curveVertex(0,f_s/1.176)
//     endShape(); //右嘴巴

//       fill(255,0,0)
//      if(mouseIsPressed)
//        {//mouseIsPressed為true，代表有按下滑鼠
//          arc(f_s/2,f_s/1.667,f_s/1.667,f_s/1.25,336,153) //下吐舌頭
//        }
//       else
//        {   //mouseIsPressed為false，代表沒有按下滑鼠       
//        }

      
  
//        fill(clr)
//       if(!songIsplay){

//         fill(255)
//         ellipse(f_s/0.658,f_s/1.4,f_s/1.5) //右手掌
//         ellipse(-f_s/0.658,f_s/1.4,f_s/1.5) //左手掌
    

//       }
//       else{
//         vol = amp.getLevel() //取得聲音值(值為0~1之間)
//         // console.log(vol)

//         fill(255)
//         ellipse(f_s/0.9+map(vol,0,0.5,f_s/2.5,f_s/6),f_s/1.2,f_s/1) //右手掌
//         ellipse(-f_s/0.9-map(vol,0,0.5,f_s/2.5,f_s/6),f_s/1.2,f_s/1) //左手掌

//         fill(255,0,0)
//         arc(f_s/2,f_s/1.667,f_s/1.667,map(vol,0,0.5,f_s/5,f_s/3),336,153) //下吐舌頭
      
//       }
      
//       noFill()


//       pop()

//       fill('#a3b18a')
//       strokeWeight(0.7)
//       rect(0,height*11.2/13,width,height/7)
//     }
//   }

function mousePressed(){
  //紀錄資料
  positionListX.push(mouseX) //把滑鼠按下的位置當作花X位置，存入到positionListX list資料內
  positionListY.push(mouseY)
  clrList.push(colors[int(random(colors.length))])
  clr_r_List.push(colors_r[int(random(colors_r.length))])
  sizeList.push(random(0.5,1.5))
  let data_length = positionListX.length
  //畫圖
  push() 
    translate(positionListX[data_length-1],positionListY[data_length-1]) //花的座標，原點移到視窗的中心點
    clr = clrList[data_length-1]
    clr_r = clr_r_List[data_length-1]
    drawFlower(clr,clr_r,sizeList[data_length-1]) 
  pop()
  }
  
  function drawKeypoints() {
    for (let i = 0; i < predictions.length; i += 1) {
      const prediction = predictions[i];
      for (let j = 0; j < prediction.landmarks.length; j += 1) {
        const keypoint = prediction.landmarks[j];
        
        // noStroke();
      if (j == 8) {			 //食指的上端	
    pointerX8 = map(keypoint[0],0,640,0,width)  //j=8所以取得第8點的資訊，keypoint[0]代表x(食指座標)
    pointerY8 = map(keypoint[1],0,480,0,height)  //keypoint[1]代表y(食指座標)
      pointerZ8 = keypoint[2] //keypoint[2]代表z(食指座標)
      console.log(pointerZ8)
      if(pointerZ8<-40)
          {
            R_draw(pointerX8,pointerY8)
          }
          
    fill(0, 255, 0);
    ellipse(pointerX8, pointerY8, 30, 30);//畫食指圓圈
          
        } else
      if (j == 4) {  //  大拇指的上端
          
      pointerX4 = map(keypoint[0],0,640,0,width)
      pointerY4 = map(keypoint[1],0,480,0,height)
          // pointerZ = keypoint[2]
          // print(pointerZ)
    fill(255,0,0)
      ellipse(pointerX4, pointerY4, 30, 30);  //畫大拇指圓圈
      
        } else
        if (j == 14) { //無名指第三關節
          pointerX14 = keypoint[0];
          pointerY14 =  keypoint[1];
        } else
        if (j == 16) { //無名指上端
          pointerX16 = keypoint[0];
          pointerY16 =  keypoint[1];
        }
        
      }
    
    }
  }
  
  function r_Flower(F_clr,F_clr_r,F_size,F_x,F_y){
    push()
      translate(F_x,F_y);
      if(pointerY14<pointerY16){   //
        drawFlower(F_clr,F_clr_r,map(d,0,600,F_size-0.2,F_size+0.6)) //花做放大縮小，無名指有彎曲
      }else
      {
        //無名指沒有彎曲，張開無名指，花做旋轉
        rotate(frameCount/20)
        drawFlower(F_clr,F_clr_r,F_size)			
      }
    pop()
  }
  
  function R_draw(handX,handY)
  {
    //紀錄資料
  positionListX.push(handX) //把滑鼠按下的位置當作花X位置，存入到positionListX list資料內
  positionListY.push(handY)
  clrList.push(colors[int(random(colors.length))])
  clr_r_List.push(colors_r[int(random(colors_r.length))])
  sizeList.push(random(0.5,1.5))
  let data_length = positionListX.length
  //畫圖
  push() 
    translate(positionListX[data_length-1],positionListY[data_length-1]) //花的座標，原點移到視窗的中心點
    clr = clrList[data_length-1]
    clr_r = clr_r_List[data_length-1]
    drawFlower(clr,clr_r,sizeList[data_length-1]) 
  pop()
  }
