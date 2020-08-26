class Food
{
    constructor(x, y, widthHeight)
    {
        this.image = loadImage('Milk.png')
        this.x = x;
        this.y = y;
        this.widthHeight = widthHeight;
        this.foodStock;
        this.lastFed;
    }
    display()
    {
        image(this.image, this.x, this.y, this.widthHeight, this.widthHeight);
    }
    getFoodStock()
    {

    }
    updateFoodStock()
    {

    }
    deductFood()
    {
        
    }
}