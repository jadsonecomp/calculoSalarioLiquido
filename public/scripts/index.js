window.addEventListener('load', start);

function start() {
  console.log('Carregou');
  preventFormSubmit();
}

function getInputGrossSalary() {
  return document.querySelector('#inputGrossSalary');
}

function getInputNumberOfDependents() {
  return document.querySelector('#inputNumberOfDependents');
}

function getInputDeduction() {
  return document.querySelector('#inputDeduction');
}

function editInput(param) {
  return param.replace(',', '.');
}

function preventFormSubmit() {
  function calcSalarySubInss() {
    var valorInss = 0.0;
    var inputGrossSalary = getInputGrossSalary().value;
    var inputGrossSalaryNumber = parseFloat(editInput(inputGrossSalary));

    // prettier-ignore
    if (inputGrossSalaryNumber <= 1045.00) {

      aliquotaInss = "7,5%";
      valorInss = inputGrossSalaryNumber - (inputGrossSalaryNumber * 0.075);

    } else {
      if ((inputGrossSalaryNumber > 1045.00 && inputGrossSalaryNumber <= 2089.60)) {
        
        aliquotaInss = "9%";
        valorInss = inputGrossSalaryNumber - (inputGrossSalaryNumber * 0.09) + 15.67;

      } 
      else {
        if ((inputGrossSalaryNumber > 2089.60 && inputGrossSalaryNumber <= 3134.40)) {
          
          aliquotaInss = "12%";
          valorInss = inputGrossSalaryNumber - (inputGrossSalaryNumber * 0.12) + 78.36;

        }else{
          if ((inputGrossSalaryNumber > 3134.40 && inputGrossSalaryNumber <= 6101.06)) {
            
            aliquotaInss = "14%";
            valorInss = inputGrossSalaryNumber - (inputGrossSalaryNumber * 0.14) + 141.05;

          }else{
            
            aliquotaInss = "Teto";
            valorInss = inputGrossSalaryNumber - 713.10;

          } 
        }
      }
    }

    valorDescInss = inputGrossSalaryNumber - valorInss;
    return valorInss;
  }

  function calcSalarySubIrrf() {
    var valorIrrf = 0.0;
    var valorIrrfIni = 0.0;
    var baseCalc = calcSalarySubInss();
    var inputNumberOfDependents = getInputNumberOfDependents().value;

    inputNumberOfDependents = parseFloat(editInput(inputNumberOfDependents));

    if (isNaN(inputNumberOfDependents)) {
      inputNumberOfDependents = 0.0;
    }

    // prettier-ignore
    valorIrrfIni = baseCalc;
    valorIrrf = baseCalc;

    var valorDependentes = 189.59 * inputNumberOfDependents;

    baseCalc = baseCalc - valorDependentes;

    // prettier-ignore
    if (baseCalc <= 1903.98) {

      aliquotaIrrf = "0%";
      valorIrrf = valorIrrfIni;

    } else {
      if ((baseCalc > 1903.98 && baseCalc <= 2826.65)) {

        aliquotaIrrf = "7,5%";
        valorIrrf = valorIrrf - (baseCalc * 0.075) + 142.80;

      } 
      else {
        if ((baseCalc > 2826.65 && baseCalc <= 3751.05)) {

          aliquotaIrrf = "15%";
          valorIrrf = valorIrrf - (baseCalc * 0.15) + 354.80;

        }else{
          if ((baseCalc > 3751.05 && baseCalc <= 4664.68)) {

            aliquotaIrrf = "22,5%";
            valorIrrf = valorIrrf - (baseCalc * 0.225) + 636.13;

          }else{

            aliquotaIrrf = "27,5%";
            valorIrrf = valorIrrf - (baseCalc * 0.275) + 869.36;

          } 
        }
      }
    }

    valorDescIrrf = valorIrrfIni - valorIrrf;
    return valorIrrf;
  }

  function calcSalarySubDeduction() {
    var valorDeduction = 0.0;
    var salarySubIrrfInss = calcSalarySubIrrf();
    var inputDeduction = getInputDeduction().value;

    inputDeduction = parseFloat(inputDeduction);

    if (isNaN(inputDeduction)) {
      inputDeduction = 0.0;
    }

    valorDeduction = salarySubIrrfInss - inputDeduction;

    valorDesconto = inputDeduction;

    return valorDeduction;
  }

  function printTable(salaryResult) {
    var getGrossSalary = getInputGrossSalary().value;
    var getGrossSalaryNumber = parseFloat(editInput(getGrossSalary));

    var grossSalary = getGrossSalaryNumber.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    var totDeduction = valorDescInss + valorDescIrrf + valorDesconto;

    valorDescInss = valorDescInss.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    valorDescIrrf = valorDescIrrf.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    valorDesconto = valorDesconto.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    totDeduction = totDeduction.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    var descricao = [
      'Descrição',
      'Salário Bruto',
      'INSS',
      'IRRF',
      'Outros Descontos',
      'Total',
      'Resultado',
    ];

    var aliquota = ['Alíquota', '', aliquotaInss, aliquotaIrrf, '', '', ''];

    var proventos = ['Proventos', grossSalary, '', '', '', grossSalary, ''];

    // prettier-ignore
    var desconto = [
      'Descontos',
      '',
      valorDescInss,
      valorDescIrrf,
      valorDesconto,
      totDeduction,
      salaryResult
    ];

    for (let index = 0; index < descricao.length; index++) {
      var tr = document.createElement('tr');
      const penultimateLine = descricao.length - 1;
      const antepenultimateLine = descricao.length - 2;
      const firstLine = 0;

      if (index === firstLine) {
        var th = document.createElement('th');
        th.textContent = descricao[index];

        var th1 = document.createElement('th');
        th1.textContent = aliquota[index];

        var th2 = document.createElement('th');
        th2.textContent = proventos[index];

        var th3 = document.createElement('th');
        th3.textContent = desconto[index];

        tr.appendChild(th);
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
      } else {
        var td = document.createElement('td');
        td.textContent = descricao[index];
        td.classList.add('boldClass');

        var td1 = document.createElement('td');
        td1.textContent = aliquota[index];

        var td2 = document.createElement('td');
        td2.textContent = proventos[index];

        var td3 = document.createElement('td');
        td3.textContent = desconto[index];

        if (index < penultimateLine) {
          td1.classList.add('deductionColor');
          td2.classList.add('earningsColor');
          td3.classList.add('deductionColor');
          if (index < antepenultimateLine) {
            td.classList.add('gridTableClass');
            td1.classList.add('gridTableClass');
            td2.classList.add('gridTableClass');
            td3.classList.add('gridTableClass');
          }
          if (index === antepenultimateLine) {
            td2.classList.add('gridTableClass');
            td3.classList.add('gridTableClass');
          }
        } else {
          td3.classList.add('earningsColor');
          td3.classList.add('boldClass');

          tr.classList.add('rowClass');
        }

        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
      }

      table.appendChild(tr);
    }
    divTableSalary.appendChild(table);
    divTableSalary.classList.add('divtableSalary');
    table.classList.add('tableSalary');
  }

  function removeTable() {
    divTableSalary.classList.remove('divtableSalary');
    table.classList.remove('tableSalary');
    table.textContent = '';
  }

  function removeNetSalary() {
    divCalcNetSalary.classList.remove('netSalary');
    labelNetSalary.textContent = '';
    labelValorNetSalart.textContent = '';
  }

  function handleSubmit(event) {
    function setNetSalary() {
      labelNetSalary.textContent = 'Salário Líquido: ';
      labelValorNetSalart.textContent = salaryResult;

      divCalcNetSalary.appendChild(labelNetSalary);
      divCalcNetSalary.appendChild(labelValorNetSalart);

      divCalcNetSalary.classList.add('netSalary');
      labelNetSalary.classList.add('positionLeft');
      labelValorNetSalart.classList.add('positionRight');
    }

    removeTable();

    var salaryResult = calcSalarySubDeduction().toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    console.log('Salário Líquido: ' + salaryResult);

    setNetSalary();

    printTable(salaryResult);

    /* Evitar o recarregamento da página*/
    event.preventDefault();
  }

  function handleReset(event) {
    removeNetSalary();

    removeTable();

    var initialInputGrossSalary = getInputGrossSalary();
    initialInputGrossSalary.focus();
  }

  var divCalcNetSalary = document.querySelector('#calcNetSalary');
  var labelNetSalary = document.createElement('label');
  var labelValorNetSalart = document.createElement('label');

  var divTableSalary = document.querySelector('#tableSalary');
  var table = document.createElement('table');
  var aliquotaInss = '';
  var aliquotaIrrf = '';
  var valorDescInss = '';
  var valorDescIrrf = '';
  var valorDesconto = '';

  var form = document.querySelector('form');

  form.addEventListener('submit', handleSubmit);
  form.addEventListener('reset', handleReset);
}
