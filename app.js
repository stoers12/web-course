// ننتظر حتى يتم تحميل الصفحة بالكامل قبل تنفيذ الكود
document.addEventListener("DOMContentLoaded", function () {
    // جلب العناصر من الواجهة
    const chickenBox = document.getElementById("chicken-box");
    const beefBox = document.getElementById("beef-box");
    const sushiBox = document.getElementById("sushi-box");
    
    const mainContent = document.getElementById("main-content");
    const dynamicContent = document.getElementById("dynamic-content");

    // دالة لجلب البيانات وعرضها في القالب
    function loadData(jsonFile, titleText) {
        fetch(jsonFile)
            .then(response => response.json())
            .then(data => {
                // بناء القالب (Template) لعرض العناصر
                let templateHTML = `<h2 class="text-center mb-4">${titleText} Details</h2><div class="row">`;
                
                data.forEach(item => {
                    templateHTML += `
                    <div class="col-md-4 col-sm-6 mb-3">
                        <div class="section-box" style="background-color: #f1f1f1; border: 1px solid #000; padding: 20px;">
                            <h3 style="margin-bottom:10px;">${item.name}</h3>
                            <p>${item.description}</p>
                        </div>
                    </div>`;
                });
                
                templateHTML += `</div><div class="text-center mt-4"><p>Refresh the page to go back to the original menu.</p></div>`;

                // إخفاء الصفحة الرئيسية وعرض الصفحة الديناميكية
                mainContent.style.display = "none";
                dynamicContent.innerHTML = templateHTML;
                dynamicContent.style.display = "block";
            })
            .catch(error => console.log("Error loading JSON: ", error));
    }

    // ربط النقر (Click Events) بالأقسام الثلاثة
    chickenBox.addEventListener("click", function() { loadData("chicken.json", "Chicken"); });
    beefBox.addEventListener("click", function() { loadData("beef.json", "Beef"); });
    sushiBox.addEventListener("click", function() { loadData("sushi.json", "Sushi"); });
});