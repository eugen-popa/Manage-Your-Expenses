//Budget Controller
var budgetControlerData = (function() {

  var Expens = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
  };
    
    var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
  };
    
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
    
    
    
})();

// UI Controller
 var UIController = (function(){

     var DOMstr = {
         inputType:'.add__type',
         inputDescription: '.add__description',
         inputValue: '.add__value',
         inputBtn: '.add__btn'
     };
     
     return{
        getInput: function() {
         return {
            type: document.querySelector(DOMstr.inputType).value, // will be either inc or exp
            description: document.querySelector(DOMstr.inputDescription).value,
            value: document.querySelector(DOMstr.inputValue).value 
         };
        },
        getDOMstr: function(){
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
        // to do list
        // 1. Get the field input data 
        var input = UICtrl.getInput();
 
        // 2. add the item to the budget controller
        
        // 3. add the item to the UI
        
        // 4. Calculeate the budget 
        
        // 5 . Display the buddget on the UI
    };
    
    return {
        init: function(){
            console.log('start aplication.');
            setupEventListeners();
        }
    };
    
})(budgetControlerData, UIController);


controller.init();





 




















