//Budget Controller
var budgetControlerData = (function() {
// same code
  
    
})();

// UI Controller
 var UIController = (function(){
// same code

 
 })();

// Global APP Controller
var controller = (function(budgetData, UICtrl) {
    
    
    var ctrlAddItem = function(){
        // to do list
        // 1. Get the filed nput data 
        
        // 2. add the item to the budget controller
        
        // 3. add the item to the UI
        
        // 4. Calculeate the budget 
        
        // 5 . Display the buddget on the UI
        
        console.log('worcks')
    }
    
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){
        if (event.keyCode === 13 || event.which === 13){
           ctrlAddItem();
        }
    });
    
    
})(budgetControlerData, UIController);


