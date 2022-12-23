let calculator = {
    a: null,
    b: null,
    read(a, b){
      this.a = ( !isNaN(a) && typeof a === 'number' ) ? a : null;
      this.b = ( !isNaN(b) && typeof b === 'number' ) ? b : null;
    },
    sum(){
      return ( this.a != null && this.b != null )? this.a + this.b : null;
    },
    mul(){
      return ( this.a != null && this.b != null )? this.a * this.b : null;
    }
  };

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
