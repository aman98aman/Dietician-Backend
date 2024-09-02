export class Utility {
    static isEmpty(obj){
        if(obj===undefined || obj === null){
            return true;
        }
        if(typeof obj === 'string'){
            return obj.length==0;
        }else if(typeof obj === 'object'){
            return Object.entries(obj).length==0;
        }
        return false;
    }
    static isNotEmpty(obj){
        return !this.isEmpty(obj)
    }
    static formatDate(date){
        if(this.isEmpty(date)){
            return date;
        }
        return `${date?.getDate()}/${date?.getMonth()}/${date?.getYear()}`
    }
    static convertToMinutes(time){
        if(this.isEmpty(time) || typeof time !== 'number'){
            return time;
        }
        return Math.floor(time/(60*1000))
    }
    static getUniqueId(){
        return `receipt_${Utility.convertToMinutes(new Date().getTime())}`;
    }
}
