let fruits = JSON.parse(localStorage.getItem("userdata")) || [];
let isEdit = -1;


const editData = (idx) => {
   console.log(idx);
   isEdit = idx;

   let recordEdit = fruits.find((item, index) => { return (index === idx) });
   console.log(recordEdit);

   document.getElementById('fname').value = recordEdit.fanme;
   document.getElementById('lname').value = recordEdit.lastname;
   document.getElementById('age').value = recordEdit.age;

}

const sortData = () => {
   const sortedData = fruits.sort((a, b) => {
      return (a.lastname > b.lastname ? -1 : 1)
   })
   console.log(sortedData);
   fruits = sortedData;
   renderHTMLTable()
   

}


const renderHTMLTable = () => {
   document.getElementById("tablebody").innerHTML = fruits
      .map((row, index) => {
         return `<tr>
      <td>${row.fanme}</td>
      <td> ${row.lastname}</td>
      <td>${row.age}</td>
      <td><button onclick="deleteData(${index})">delete</button>
      
      <button onclick="editData(${index})">Edit</button></td>

     </tr>`;
      })
      .join("");
}

renderHTMLTable();

const deleteData = (indx) => {
   console.log(indx);

   const deletedData = fruits?.filter((item, index) => { return index !== indx });
   console.log(deletedData);

   localStorage.setItem("userdata", JSON.stringify(deletedData))

   fruits = deletedData;

   renderHTMLTable();
}

const handleSearch = () => {

   const searchvalue = document.getElementById('search').value;
   const searchData = fruits?.filter((item, index) => {
      return (item?.fanme.toLocaleLowerCase().includes(searchvalue.toLocaleLowerCase()))
   })

   console.log(searchData);
   if (searchvalue !== '') { fruits = searchData; }
   else {
      fruits = JSON.parse(localStorage.getItem("userdata"))
   }
   renderHTMLTable();
}

function demo() {
   let firstname = document.getElementById("fname").value
   console.log(firstname);
   let lastname = document.getElementById("lname").value
   console.log(lastname);
   let aage = document.getElementById("age").value
   console.log(aage);
   const person = { fanme: firstname, lastname: lastname, age: aage };



   if (isEdit !== -1) {
      const updated = fruits.map((ite, index) => {

         if (isEdit === index) {
            return person
         }
         else return ite
      });

      fruits = updated;



   }
   else {
      fruits.push(person);
   }

   localStorage.setItem("userdata", JSON.stringify(fruits));

   renderHTMLTable();

}













