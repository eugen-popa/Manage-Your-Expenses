// Budget Controller
var budgetController = (function(){
    
    var incom = document.querySelector('.budget__income--value').value;
    var expenss = document.querySelector('.budget__expenses--value').value;
        
})();

//********************************************************
// UI Controller
var UIController = (function() {
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescrp: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
    }
    
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescrp).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();

//********************************************************
// Global APP controller
var controller = (function(budgetCtrl, UICtrl){
    
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
        
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem)
        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which === 13){
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function(){
        // 1. get input data 
        var inputData = UICtrl.getInput();
        console.log(inputData.type)
          if(inputData.type === 'inc'){
            
            }
        // 2. add the item to the budget controller 
        
        // 3. add the item to the UI

        // 4. calculate the budget

        // 5. Display the Budget on the UI
    }
    
    return {
        init: function(){
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();