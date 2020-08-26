var dog, happyDog, database, foodS, foodStock, happyDogImg, dogImg, 
button, rows1, rows2, none, together, button2, milk, milkImg, time1, time2, lastFed;
var food = [];

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
  milkImg = loadImage('Milk.png')
  
}

function setup() {
  
  createCanvas(800, 500);

  database = firebase.database();

  foodStock = database.ref('Food');
  rows1 = database.ref('row1');
  rows2 = database.ref('row2');
  foodStock.on('value', readStock);
  rows2.on('value', row2Stock);
  rows1.on('value', row1Stock);


  dog = createSprite(550, 250);
  dog.addImage("dog", dogImg)
  dog.scale = 0.15;

  milk = createSprite(480, 260);
  milk.addImage('milk', milkImg)
  milk.scale = 0.10;
  milk.visible = false;

  button = createButton('Restart');
  button.position(1270, 160);

  button2 = createButton('Add Food');
  button2.position(1100, 160);

}

function readStock(data)
{
  foodS = data.val();
}
function row2Stock(data)
{
  rows2 = data.val();
}
function row1Stock(data)
{
  rows1 = data.val();
}

function writeStock(x)
  {
    database.ref('/').update({
      Food:x
    })
    
}
function updateRow1()
{
  database.ref('/').update({
    row1: rows1-1
  })
}
function updateRow2()
{
  database.ref('/').update({
    row2: rows2 - 1
  })
}


function updateFood(){
  database.ref('/').update({
    Food : foodS - 1
  })
  
}

function restart()
{
  database.ref('/').update({
    Food: 20,
    row1: 10,
    row2: 10,
    None:false,
  })
  food = [];
  for(var j = 0; j < 100; j = j + 50)
    {
      for (var i = 0; i < 300; i = i + 30)
      {
        food.push(new Food(i + 20, j+195, 50));
      }
    }
}

function noFood()
{
  noStroke();
    fill('white');
    textSize(20);
    text('NO MORE FOOD; Please add food to the stock', 370, 100);
    dog.addImage('dog', dogImg);
}

function addFood()
{
  if (together < 20)
  {
      database.ref('/').update({
        row1:10, 
        row2: 10
      })
      for(var j = 0; j < 100; j = j + 50)
    {
      for (var i = 0; i < 300; i = i + 30)
      {
        food.push(new Food(i + 20, j+195, 50));
      }
    }
  }
}

function draw() {  

  
  //console.log(mouseX, mouseY);
  background(49, 139, 87);
  button.mousePressed(restart)
  button2.mousePressed(addFood)
  for (var i = 0; i < food.length; i++)
  {
    food[i].display();
  }

  if(keyWentDown(UP_ARROW))
  {
    if (rows2 > 0)
    {
      updateRow2()
      milk.visible = true;
      time1 = hour();
    }
    else if(rows1 > 0 && rows2 == 0)
    {
      updateRow1();
      milk.visible = true;
      time2 = hour()
    }
    else if(rows1 === 0)
    {
      noFood();
    }
    food.pop();

  }
  else
  {
    milk.visible = false;}
  if (together < 20)
  {
    dog.addImage('dog', happyDogImg);
  }
  else
  {
    dog.addImage('dog', dogImg);
  }


  //console.log(rows1);
  // console.log('hello');
  drawSprites();
  noStroke();
  fill('white');
  textSize(20);
  together = rows1+rows2
  if (rows1 > 0 || rows2 > 0)
  {
    text("Note: press UP_ARROW to feed the dog", 375, 50);
    text('Amount of remaining food: ' + together, 415, 100);
    
  }
  else if(rows1 == 0 && rows2 == 0)
  {
    noFood();
    milk.visible = false;
  }
  console.log(together)
  if (together == 20)
  {
    noStroke();
    fill('white');
    textSize(20);
    milk.visible = false;
    
  }
  lastFed = time2-time1
  console.log(time1, time2);
  text('Last Fed: ' + lastFed+ ' hour(s) ago', 50, 100)
}

