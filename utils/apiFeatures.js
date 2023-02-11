class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;    //query = Product.find() = all documents
        this.queryStr = queryStr;   //querystr = search product name
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options:'i'
            }
        } : {}
        // console.log(keyword);
        this.query = this.query.find({...keyword});  //based on product name it will find the search product.
        return this;  //returning this class
    }

    filter(){
        const queryCopy = {...this.queryStr};
        // removing all the fields except category - filter for category 
        const removedFields = ['keyword', 'page', 'limit'];
        removedFields.forEach(key => delete queryCopy[key]);
        // console.log(queryCopy); - now querycopy only consist category

        // filter for price 
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, key=>`$${key}`);
        // console.log(queryStr);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(productPerPage){
        let currentPage = Number(this.queryStr.page) || 1;
        let skipPages = productPerPage*(currentPage-1);
        this.query=this.query.limit(productPerPage).skip(skipPages);
        return this;
    }
}

module.exports = ApiFeatures