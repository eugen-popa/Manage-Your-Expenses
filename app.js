//Budget Controller
var budgetControlerData = (function() {

  var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
  };
    
    var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
  };
    //data structure
    var data = {
        
        allItems:{
            exp:[],
            inc:[]
        },
        
        total:{
            exp: 0,
            inc: 0
        }
    };
    
    return {
        addItem: function(type, des, val){
            var newItem, ID;
            
            // Create new ID
            if (data.allItems[type].length > 0){
                ID = data .allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                    ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if (type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            
            // Push in into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;  
        },
        testing: function() {
            console.log(data);
        }
    };
    
})();

// Uuser Interface Controller
 var UIController = (function(){

     var DOMstr = {
         inputType:'.add__type',
         inputDescription: '.add__description',
         inputValue: '.add__value',
         inputBtn: '.add__btn',
         incomeContainer: '.income__list',
         expencesesContaner: '.expenses__list'
     };
     
     return{
        getInput: function() {
         return {
            type: document.querySelector(DOMstr.inputType).value, // will be either inc or exp
            description: document.querySelector(DOMstr.inputDescription).value,
            value: document.querySelector(DOMstr.inputValue).value 
         };
        },
         
         addListItem: function(obj, type){
             var html, newHtml;
             //create HTML string with place holder text
               if (type === 'inc'){
                   element = DOMstr.incomeContainer;
                   
                   html =  '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
               } else if(type === 'exp'){
                   element = DOMstr.expencesesContaner;
                   
                   html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
               }
             
             // Replace the placeholder text with some actual data
             newHtml = html.replace('%id%', obj.id);
             newHtml = newHtml.replace('%description%', obj.description);
             newHtml = newHtml.replace('%value%', obj.value);
             
             // Insert the HTML into the DOM
             document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
         },
         
         clearFields: function(){
             var fields, fieldsArr;
             fields = document.querySelectorAll(DOMstr.imputDescription + ', '+ DOMstr.inputValue);
         
             
             fieldsArr = Array.prototype.slice.call(fields);
         
             fieldsArr.forEach(function(current, index, array) {
                 current.value = "";
             });
             
             fieldsArr[0].focus();
         },
         
        getDOMstr: function() {
             return DOMstr;
         }
     };
 
 })();

// Global APP Controller
var controller = (function(budgetData, UICtrl) {
    
    var setupEventListeners = function(){
        
        var DOM = UICtrl.getDOMstr();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    }
    
    var ctrlAddItem = function() {
        var input, newItem;
        
        // to do list
        // 1. Get the field input data 
        input = UICtrl.getInput();
 
        // 2. add the item to the budget controller
        newItem = budgetData.addItem(input.type, input.description,  input.value);
        
        // 3. add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        // 4. Clear the fielsds
        UICtrl.clearFields();
        
        // 5. Calculeate the budget 
        
        // 6 . Display the buddget on the UI
    };
    
    return {
        init: function(){
            console.log('start aplication.');
            setupEventListeners();
        }
    };
    
})(budgetControlerData, UIController);


controller.init();





 




















