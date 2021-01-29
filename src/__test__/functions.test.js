import {postData} from '../client/js/formHandler';
import {checkPolarity} from '../client/js/utils'

describe("Testing functions",()=>{

    //before star this test it is necessaire run in the terminal node src/server/index.js
    //after it is necessaire open another terminal and npm run test
    test('Testing postData function', ()=>{
        return postData('http://localhost:8081/searchText', {text:"test"})
        .then(data=>{          
            expect(data.status.msg).toEqual('OK');
        });                   
    });

    //before star this test it is necessaire run in the terminal node src/server/index.js
    //after it is necessaire open another terminal and npm run test
    test('Testing postData function', ()=>{
        return postData('http://localhost:8081/searchUrl', {url:"https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1/what-is-sentiment-analysis"})
        .then(data=>{          
            expect(data.status.msg).toEqual('OK');
        });                   
    });

    //testing checkPolarity
    test('Testing checkPolarity function', ()=>{                       
        expect(checkPolarity('P+')).toEqual('STRONG POSITIVE');
        expect(checkPolarity('P')).toEqual('POSITIVE');
        expect(checkPolarity('NEU')).toEqual('NEURAL');
        expect(checkPolarity('N')).toEqual('NEGATIVE');
        expect(checkPolarity('N+')).toEqual('STRONG NEGATIVE');
        expect(checkPolarity('NONE')).toEqual('NONE');
                         
    });
});