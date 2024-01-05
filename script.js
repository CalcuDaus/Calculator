const numberResult = document.querySelector(".number-result");
const buttons = document.querySelectorAll(".button");
const tableEl = document.querySelector('#table-data');

const main = () => {
  let isFirstNumber = true;
  let firstNumber = '';
  let secondNumber = '';
  let operator = '';
  let hasil = '';
  let data = [];

  const handleButtonNumberClick = () => {
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        if (button.classList.contains("number")) {
          if (isFirstNumber) {
            firstNumber += this.innerText;
          } else {
            secondNumber += this.innerText;
          }
          if (numberResult.innerText[0] == "0") {
            numberResult.innerText = numberResult.innerText.slice(1);
          }
          numberResult.innerText += this.innerText;
        }
      });
    });
  };

  const handleButtonClearClick = () => {
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        if (button.classList.contains("ce")) {
          isFirstNumber = true;
          numberResult.innerText = "0";
          hasil = '';
          firstNumber = '';
          secondNumber = ''
        }
      });
    });
  };

  const handleButtonOperatorClick = () => {
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        if (button.classList.contains("operator")) {
          if (isFirstNumber) {
            numberResult.innerText = "0";
            isFirstNumber = false;
            operator = this.innerText;
          }
        }
      });
    });
  };

  const handleButtonEqualsClick = ()=>{
    buttons.forEach(button => {
        button.addEventListener('click',function(){
            if(button.classList.contains('equals')){
                if(isFirstNumber && firstNumber != ''){
                    alert('silahkan masukkan angka kedua')
                }else{
                    switch (operator) {
                        case 'x':
                            hasil = parseInt(firstNumber) * parseInt(secondNumber);
                            break;
                        case ':':
                            hasil = parseInt(firstNumber) / parseInt(secondNumber);
                            break;
                        case '-':
                            hasil = parseInt(firstNumber) - parseInt(secondNumber);
                            break;
                        case '+':
                            hasil = parseInt(firstNumber) + parseInt(secondNumber);
                            break;
                        default:
                            alert('error');
                            break;
                    }
                    numberResult.innerText = hasil;
                    let dataRaw = {
                        first : firstNumber,
                        second : secondNumber,
                        op : operator,
                        result : hasil
                    }
                    data.push(dataRaw);
                    console.log(dataRaw);
                    localStorage.setItem('data',JSON.stringify(data))
                    isFirstNumber = true;
                    secondNumber = '';
                    firstNumber = hasil;
                }
                renderStorage();
            }
        })
    })
  }
  const renderStorage = ()=>{
    if(localStorage.getItem('data') != null){
        let dataStorage = JSON.parse(localStorage.getItem('data'));
        let dataFinal = dataStorage.slice(-5);
        tableEl.innerHTML = '';
        dataFinal.forEach(data => {
            tableEl.innerHTML += `
                <tr>
                    <td>${data.first}</td>
                    <td>${data.op}</td>
                    <td>${data.second}</td>
                    <td>${data.result}</td>
                </tr>
            `
        })
    }
  }

  const handleHapusDataClick = ()=>{
    document.querySelector('.hapus-data').addEventListener('click',()=>{
      localStorage.removeItem('data');
      alert('Data Berhasil dihapus');
      tableEl.innerHTML = '';
    })
  }
  handleHapusDataClick();
  handleButtonEqualsClick();
  handleButtonOperatorClick();
  handleButtonClearClick();
  handleButtonNumberClick();
  renderStorage();
};

document.addEventListener("DOMContentLoaded", main);
