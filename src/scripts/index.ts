require.context('../images/', true, /\.(png|ico|svg|jpg|gif)$/);

// import "../css/bootstrap-main";
import "../css/main";
$("body").append("hallo should have a blue background image");
const p = document.createElement("p");
p.innerText="hallo";
p.setAttribute("class","hello");

$("body").append(p);