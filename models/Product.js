function Product(id,name,img,type1,type2,info,date,img1,img2){
	this.pId = id;
  this.pName = name;
  this.pImg = img;
  this.pType1 = type1;  //一级产品类别
  this.pType2 = type2;	//二级产品类别
  this.pInfo = info;    //产品说明
  this.pDate = date;
  this.pImg1 = img1;
  this.pImg2 = img2;
}

module.exports = Product;