const puppeteer = require('puppeteer');

(async () => {
    let url = 'https://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=640254&CatId=3'

    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto(url,{waitUntil:'networkidle2'});

    let data = await page.evaluate(()=>{

        let reviewComment = document.querySelector('div[class="rightCol"] p').innerText;
        let reviewName = document.querySelector('dl[class="reviewer"] > dd').innerText ;
    
        
        const array = []
        let rating = document.querySelector('dl[class="itemReview"] > dd').innerText;
        let date1 = []
        for(j in rating){
            date1.push(rating[j])
        }
        let x1 = date1.slice(-4,-1)
        array.push(x1)
        let dateReview1 = array.join()
        let str1 = ''
        for(j in dateReview1){
            
            if (dateReview1[j] == ','){
                 continue
             }
             else{
                 str1 += dateReview1[j]
             }

         }


        const arr = []
        let reviewDate = document.querySelector('dl[class="reviewer"]').innerText
        let date = []
        
        for( i in reviewDate){
            date.push(reviewDate[i])
        }
        let x = date.slice(-13,-1)
        arr.push(x)
        let dateReview = arr.join()
        let str = ''
        for(i in dateReview){
            
            if (dateReview[i] == ','){
                continue
            }
            else{
                str += dateReview[i]
            }

        }

        return{
            reviewName,
            reviewComment,
            str1,
            str
        }

    })
    console.log(data)


    await browser.close()
})();