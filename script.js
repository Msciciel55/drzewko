
let nodes = [];
let connections = [];
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let lastX, lastY;
let activeConnections = [];
let tooltipTimeout;
let learnedSkills = new Set();
let blockedSkills = new Set();
let history = [];
let isModalOpen = false;
let zoomLevel = 1; 
const zoomFactor = 0.1;

let icons = {
    "Gołodupiec": "https://cdn.discordapp.com/avatars/472993187183591425/a_a2337b68637c7195080952341f92d3b5.gif?size=2048",
    "Kowalstwo": "https://wow.zamimg.com/images/wow/icons/large/ui_profession_blacksmithing.jpg",
    "Krawiectwo": "https://wow.zamimg.com/images/wow/icons/large/ui_profession_tailoring.jpg",
    "Łowiectwo": "https://wow.zamimg.com/images/wow/icons/large/classicon_hunter.jpg",
    "Stolarstwo": "https://wow.zamimg.com/images/wow/icons/large/inv_tradeskillitem_01.jpg",
    "Alchemictwo": "https://wow.zamimg.com/images/wow/icons/large/inv_enchant_alchemycatalyst.jpg",
    "Menelstwo": "https://media1.tenor.com/m/d8eoq1lI8nEAAAAd/peon-warcraft3.gif",
    "Karczmarstwo": "https://wow.zamimg.com/images/wow/icons/large/inv_drink_08.jpg",
    "Złodziejstwo": "https://wow.zamimg.com/images/wow/icons/large/ability_stealth.jpg",
    "Strzelectwo": "https://wow.zamimg.com/images/wow/icons/large/inv_weapon_crossbow_02.jpg"

};
let notes = {
    "Farmer T1": "Podstawowe rolnictwo\n\nTa umiejętność odblokuje: \n - Uprawa marchwi\n - Uprawa ziemniaka\n - Uprawe zboż\n - Mielenie zboża\n\nWymagania: \n - 10PN",
 "Farmer T2": "Zawansowane rolnictwo\n\nTa umiejętność odblokuje:\n-Uprawa x\n-Uprawa x\n-Uprawe zboż\n-Mielenie zboża\n\nWymagania:\n -20PN\nUkończ zadanie:\n-Zapasy dla straży.",
 "Farmer T3": "Mistrzowskie rolnictwo\n\nTa umiejętność odblokuje:\n-Uprawa x\n-Uprawa x\n-Uprawe zboż\n-Mielenie zboża\n\nWymagania:\n -60PN\n-Dwa tuziny x\n-Trzy tuziny x.",
    "Felczer T1": "Medycyna polowa\n\nTa umiejętność odblokuje:\n-Tworzenie bandaży\n-Tworzenie szyn\n\nWymagania:\n-10PN",
"Kowal T1": "Podstawa Kowalstwa\n\nTa umiejętność odblokuje:\n-Tworzenie prostych narzędzi\n\nWymagania:\n-10PN"
};
function preload() {
    for (let label in icons) {
        icons[label] = loadImage(icons[label]);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    let start = new Node(0, 0, "Gołodupiec");
    nodes.push(start);
    learnedSkills.add(start.label);


    let progressNode1 = new Node(0, -400, "Inteligencja", true); 
    nodes.push(progressNode1);
    connections.push([start, progressNode1]);

    let progressNode2 = new Node(-100, -350, "Zręczność", true); 
    nodes.push(progressNode2);
    connections.push([start, progressNode2]);

    let progressNode22 = new Node(100, -350, "Siła", true); 
    nodes.push(progressNode22);
    connections.push([start, progressNode22]);

    let progressNode3 = new Node(-200, -300, "Bronie jednoręczne", true); 
    nodes.push(progressNode3);
    connections.push([start, progressNode3]);

    let progressNode33 = new Node(200, -300, "Bronie Dwuręczne", true); 
    nodes.push(progressNode33);
    connections.push([start, progressNode33]);

    let progressNode4 = new Node(-300, -250, "Łuki", true); 
    nodes.push(progressNode4);
    connections.push([start, progressNode4]);

    let progressNode44 = new Node(300, -250, "Kusze", true); 
    nodes.push(progressNode44);
    connections.push([start, progressNode44]);

    let professions = ["Kowalstwo", "Menelstwo", "Krawiectwo","Łowiectwo","Karczmarstwo", "Alchemictwo","Strzelectwo", "Stolarstwo", "Złodziejstwo"];
    let offsets = [
        {x: -width / 3, y: height / 3},
        {x: 0, y: height / 3},
        { x: width / 3, y: height / 3 },
        
        {x: -width / 1.68, y: height / 3},
        { x: width / 1.68, y: height / 3 },
        { x: -width / 1.15, y: height / 3 },
        { x: width / 1.15, y: height / 3 },
        { x: -width / 0.9, y: height / 3 },
        { x: width / 0.9, y: height / 3 }
    ];

    let kowalNode, robotnikNode, krawiecNode, lowcaNode, karczmarzNode, uczonyNode, miotaczNode, stolarzNode, zlodziejNode;
    for (let i = 0; i < professions.length; i++) {
        let node = new Node(offsets[i].x, offsets[i].y, professions[i]);
        nodes.push(node);
        connections.push([start, node]);
        if (professions[i] === "Kowalstwo") kowalNode = node;
        if (professions[i] === "Menelstwo") robotnikNode = node;
        if (professions[i] === "Krawiectwo") krawiecNode = node;
        if (professions[i] === "Łowiectwo") lowcaNode = node;
        if (professions[i] === "Karczmarstwo") karczmarzNode = node;
        if (professions[i] === "Alchemictwo") uczonyNode = node;
        if (professions[i] === "Strzelectwo") miotaczNode = node;
        if (professions[i] === "Stolarstwo") stolarzNode = node;
        if (professions[i] === "Złodziejstwo") zlodziejNode = node;
    }

    let jobs = ["Drwal","Cieśla","Farmer","Zbieracz","Hutnik", "Górnik"];
    let jobNodes = [];
    let jobOffsetY = 150;
    let jobSpacing = 100;

    for (let i = 0; i < jobs.length; i++) {
        let node = new Node(robotnikNode.x + (i - 2.5) * jobSpacing, robotnikNode.y + jobOffsetY, jobs[i] + " T1");
        nodes.push(node);
        connections.push([robotnikNode, node]);
        jobNodes.push(node);
    }

    let tierOffsetY = 150;
    for (let job of jobNodes) {
        for (let tier = 2; tier <= 3; tier++) {
            let node = new Node(job.x, job.y + tierOffsetY, job.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([job, node]);
            job = node;
        }
    }

    
    let lowcaSkills = ["Rybak","Myśliwy","Garbarz"];
    let lowcaOffsetX = -100;
    let lowcaNodes = [];

    for (let i = 0; i < lowcaSkills.length; i++) {
        let node = new Node(lowcaNode.x + lowcaOffsetX, lowcaNode.y + jobOffsetY, lowcaSkills[i] + " T1");
        nodes.push(node);
        connections.push([lowcaNode, node]);
        lowcaNodes.push(node);
        lowcaOffsetX += 100;
    }

    for (let lowcaJob of lowcaNodes) {
        let maxTiers = 3; 
        if (lowcaJob.label.startsWith("Myśliwy")) {
            maxTiers = 5; 
        }
    
        for (let tier = 2; tier <= maxTiers; tier++) {
            let node = new Node(lowcaJob.x, lowcaJob.y + tierOffsetY, lowcaJob.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([lowcaJob, node]);
            lowcaJob = node;
        }
    }

    let karczmarzSkills = ["Gorzelnik","Kucharz"];
    let karczmarzOffsetX = -50;
    let karczmarzNodes = [];

    for (let i = 0; i < karczmarzSkills.length; i++) {
        let node = new Node(karczmarzNode.x + karczmarzOffsetX, karczmarzNode.y + jobOffsetY, karczmarzSkills[i] + " T1");
        nodes.push(node);
        connections.push([karczmarzNode, node]);
        karczmarzNodes.push(node);
        karczmarzOffsetX += 100;
    }

    for (let karczmarzJob of karczmarzNodes) {
        let maxTiers = 3;
        if (karczmarzJob.label.startsWith("Kucharz")) {
            maxTiers = 5;
        }
        for (let tier = 2; tier <= maxTiers; tier++) {
            let node = new Node(karczmarzJob.x, karczmarzJob.y + tierOffsetY, karczmarzJob.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([karczmarzJob, node]);
            karczmarzJob = node;
        }
    }

    let zlodziejSkills = ["Złodziej"];
    let zlodziejOffsetX = 0;
    let zlodziejNodes = [];
    
    for (let i = 0; i < zlodziejSkills.length; i++) {
        let node = new Node(zlodziejNode.x + zlodziejOffsetX, zlodziejNode.y + jobOffsetY, zlodziejSkills[i] + " T1");
        nodes.push(node);
        connections.push([zlodziejNode, node]);
        zlodziejNodes.push(node);
        zlodziejOffsetX += 100;
    }
    
    for (let zlodziejJob of zlodziejNodes) {
        let maxTiers = 3;
        for (let tier = 2; tier <= maxTiers; tier++) {
            let node = new Node(zlodziejJob.x, zlodziejJob.y + tierOffsetY, zlodziejJob.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([zlodziejJob, node]);
            zlodziejJob = node;
        }
    }

    let kowalSkills = ["Miecznik", "Kowal","Płatnerz"];
    let kowalOffsetX = -100;
    let kowalNodes = [];

    for (let i = 0; i < kowalSkills.length; i++) {
        let node = new Node(kowalNode.x + kowalOffsetX, kowalNode.y + jobOffsetY, kowalSkills[i] + " T1");
        nodes.push(node);
        connections.push([kowalNode, node]);
        kowalNodes.push(node);
        kowalOffsetX += 100;
    }

    for (let kowalJob of kowalNodes) {
        let maxTiers = 5; 
        if (kowalJob.label.startsWith("Kowal")) {
            maxTiers = 2; 
        }
        for (let tier = 2; tier <= maxTiers; tier++) {
            let node = new Node(kowalJob.x, kowalJob.y + tierOffsetY, kowalJob.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([kowalJob, node]);
            kowalJob = node;
        }
    }

    let stolarzSkills = ["Stolarz"];
    let stolarzOffsetX = -0;
    let stolarzNodes = [];
    
    for (let i = 0; i < stolarzSkills.length; i++) {
        let node = new Node(stolarzNode.x + stolarzOffsetX, stolarzNode.y + jobOffsetY, stolarzSkills[i] + " T1");
        nodes.push(node);
        connections.push([stolarzNode, node]);
        stolarzNodes.push(node);
        stolarzOffsetX += 100;
    }
    
    for (let stolarzJob of stolarzNodes) {
        let maxTiers = 4;
        for (let tier = 2; tier <= maxTiers; tier++) {
            let node = new Node(stolarzJob.x, stolarzJob.y + tierOffsetY, stolarzJob.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([stolarzJob, node]);
            stolarzJob = node;
        }
    }

    let krawiecSkills = ["Kuśnierz","Krawiec","Kaletnik"];
    let krawiecOffsetX = -100;
    let krawiecNodes = [];

    for (let i = 0; i < krawiecSkills.length; i++) {
        let node = new Node(krawiecNode.x + krawiecOffsetX, krawiecNode.y + jobOffsetY, krawiecSkills[i] + " T1");
        nodes.push(node);
        connections.push([krawiecNode, node]);
        krawiecNodes.push(node);
        krawiecOffsetX += 100;
    }

    for (let krawiecJob of krawiecNodes) {
        let maxTiers = 5;
        if (krawiecJob.label.startsWith("Krawiec")) {
            maxTiers = 2;
        }
        for (let tier = 2; tier <= maxTiers; tier++) {
            let node = new Node(krawiecJob.x, krawiecJob.y + tierOffsetY, krawiecJob.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([krawiecJob, node]);
            krawiecJob = node;
        }
    }

    let uczonySkills = ["Alchemik", "Felczer"];
    let uczonyOffsetX = 0;
    let uczonyNodes = [];

    for (let i = 0; i < uczonySkills.length; i++) {
        let node = new Node(uczonyNode.x + uczonyOffsetX, uczonyNode.y + jobOffsetY, uczonySkills[i] + " T1");
        nodes.push(node);
        connections.push([uczonyNode, node]);
        uczonyNodes.push(node);
        uczonyOffsetX += 100;
    }

    for (let uczonyJob of uczonyNodes) {
        let maxTiers = 1;
        if (uczonyJob.label.startsWith("Alchemik T1")) {
            maxTiers = 4;
        }
        for (let tier = 2; tier <= maxTiers; tier++) {
            let node = new Node(uczonyJob.x, uczonyJob.y + tierOffsetY, uczonyJob.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([uczonyJob, node]);
            uczonyJob = node;
        }
    }
    
    let miotaczSkills = ["Łuczarz", "Kusznikarz",];
let miotaczOffsetX = -50;
let miotaczNodes = [];

for (let i = 0; i < miotaczSkills.length; i++) {
    let node = new Node(miotaczNode.x + miotaczOffsetX, miotaczNode.y + jobOffsetY, miotaczSkills[i] + " T1");
    nodes.push(node);
    connections.push([miotaczNode, node]);
    miotaczNodes.push(node);
    miotaczOffsetX += 100;
}

for (let miotaczJob of miotaczNodes) {
    let maxTiers = 4;
    for (let tier = 2; tier <= maxTiers; tier++) {
        let node = new Node(miotaczJob.x, miotaczJob.y + tierOffsetY, miotaczJob.label.split(" ")[0] + " T" + tier);
        nodes.push(node);
        connections.push([miotaczJob, node]);
        miotaczJob = node;
    }
    }
    let alchemikT1Node = nodes.find(node => node.label === "Alchemik T1");
    let felczerT1Node = nodes.find(node => node.label === "Felczer T1");
    if (alchemikT1Node && felczerT1Node) {
        connections.push([alchemikT1Node, felczerT1Node]);
    }
    if (uczonyNode && felczerT1Node) {
        connections = connections.filter(conn => !(conn[0] === uczonyNode && conn[1] === felczerT1Node));
    }
    if (felczerT1Node) {
        felczerT1Node.x += 0; // Przesuń w prawo
        felczerT1Node.y += 50;  // Przesuń w dół
    }

    let kowalT1Node = nodes.find(node => node.label === "Kowal T1");
    let krawiecT1Node = nodes.find(node => node.label === "Krawiec T1");

    let miecznikT1Node = nodes.find(node => node.label === "Miecznik T1");
    let platnerzT1Node = nodes.find(node => node.label === "Płatnerz T1");
    let kusnierzT1Node = nodes.find(node => node.label === "Kuśnierz T1");
    let kaletnikT1Node = nodes.find(node => node.label === "Kaletnik T1");
    
    if (kowalT1Node && miecznikT1Node) {connections.push([kowalT1Node, miecznikT1Node]);}
    if (kowalT1Node && platnerzT1Node) { connections.push([kowalT1Node, platnerzT1Node]);}
    if (krawiecT1Node && kusnierzT1Node) { connections.push([krawiecT1Node, kusnierzT1Node]); }
    if (krawiecT1Node && kaletnikT1Node) {connections.push([krawiecT1Node, kaletnikT1Node]);}

    if (kowalNode && miecznikT1Node) {connections = connections.filter(conn => !(conn[0] === kowalNode && conn[1] === miecznikT1Node));}
    if (kowalNode && platnerzT1Node) { connections = connections.filter(conn => !(conn[0] === kowalNode && conn[1] === platnerzT1Node));}
    if (krawiecNode && kusnierzT1Node) { connections = connections.filter(conn => !(conn[0] === krawiecNode && conn[1] === kusnierzT1Node)); }
    if (krawiecNode && kaletnikT1Node) { connections = connections.filter(conn => !(conn[0] === krawiecNode && conn[1] === kaletnikT1Node)); }


    if (miecznikT1Node) {
        miecznikT1Node.x += 0; // Przesuń w prawo
        miecznikT1Node.y += 50;  // Przesuń w dół
    }
    if (platnerzT1Node) {
        platnerzT1Node.x += 0; // Przesuń w prawo
        platnerzT1Node.y += 50;  // Przesuń w dół
    }
    if (kusnierzT1Node) {
        kusnierzT1Node.x += 0; // Przesuń w prawo
        kusnierzT1Node.y += 50;  // Przesuń w dół
    }
    if (kaletnikT1Node) {
        kaletnikT1Node.x += 0; // Przesuń w prawo
        kaletnikT1Node.y += 50;  // Przesuń w dół
    }
}




function draw() {
    background(20);
    translate(width / 2 + offsetX, height / 2 + offsetY);
    scale(zoomLevel);
    stroke(200);

    for (let conn of connections) {
        let opacity = 255;
        if (isSkillBlocked(conn[0].label) || isSkillBlocked(conn[1].label)) {
            opacity = 50;
        }
        strokeWeight(1);
        stroke(200, opacity);
        line(conn[0].x, conn[0].y, conn[1].x, conn[1].y);
    }

    for (let node of nodes) {
        let opacity = 255;
        if (isSkillBlocked(node.label)) {
            opacity = 50;
        }

        if (node.isProgressNode) {
            fill(node.isActive ? 'red' : `rgba(173, 216, 230, ${opacity / 255})`);
            stroke(node.isActive ? 255 : 255);
            strokeWeight(node.isActive ? 3 : 1);
            ellipse(node.x, node.y, 60); 

            let radius = 30; 
            let startAngle = -HALF_PI; 
            let endAngle = startAngle + TWO_PI * (node.progress / 100); 

            noFill();
            stroke(100, 100, 100, opacity);
            strokeWeight(6); 
            arc(node.x, node.y, radius * 2, radius * 2, 0, TWO_PI);

            stroke(0, 255, 0, opacity);
            strokeWeight(6); 
            arc(node.x, node.y, radius * 2, radius * 2, startAngle, endAngle);

            fill(255, opacity);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(12);
            text(`${node.progress}%`, node.x, node.y);

            fill(255, opacity);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(12);
            text(node.label, node.x, node.y - 40); 
        } else {
            fill(node.isActive ? 'red' : `rgba(173, 216, 230, ${opacity / 255})`);
            stroke(node.isActive ? 255 : 255);
            strokeWeight(node.isActive ? 3 : 1);
            ellipse(node.x, node.y, 40);

            if (icons[node.label]) {
                let iconOpacity = isSkillBlocked(node.label) ? 50 : 255;

                drawingContext.save();
                drawingContext.beginPath();
                drawingContext.arc(node.x, node.y, 15, 0, TWO_PI);
                drawingContext.clip();

                imageMode(CENTER);
                tint(255, iconOpacity);
                image(icons[node.label], node.x, node.y, 30, 30);
                noTint();

                drawingContext.restore();
            }

            fill(255, opacity);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(12);
            text(node.label, node.x, node.y - 30);
        }

        if (isSkillBlocked(node.label)) {
            stroke(255, 0, 0);
            strokeWeight(3);
            line(node.x - 20, node.y - 20, node.x + 20, node.y + 20);
            line(node.x - 20, node.y + 20, node.x + 20, node.y - 20);
        }
    }
}

function mousePressed() {
    if (isModalOpen) return;

    let adjustedMouseX = (mouseX - width / 2 - offsetX) / zoomLevel;
    let adjustedMouseY = (mouseY - height / 2 - offsetY) / zoomLevel;

    if (mouseButton === RIGHT) {
        isDragging = true;
        lastX = mouseX;
        lastY = mouseY;

        for (let node of nodes) {
            let d = dist(adjustedMouseX, adjustedMouseY, node.x, node.y);
            if (d < 20) {
                draggedNode = node; 
                break;
            }
        }
    }

    if (mouseButton === LEFT) {
        for (let node of nodes) {
            let d = dist(adjustedMouseX, adjustedMouseY, node.x, node.y);
            if (d < 20) {
                handleLearning(node);
                break;
            }
        }
    }
}

function mouseReleased() {
    if (mouseButton === RIGHT) {
        isDragging = false;
    }
}

function mouseDragged() {
    if (isModalOpen) return;

    if (isDragging) {
        let dx = mouseX - lastX;
        let dy = mouseY - lastY;

        for (let node of nodes) {
            node.x += dx;
            node.y += dy;
        }

        lastX = mouseX;
        lastY = mouseY;
    }
}

function mouseMoved() {
    clearTimeout(tooltipTimeout);
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';

    // Przeliczanie współrzędnych myszy z uwzględnieniem zoomu i offsetu
    let adjustedMouseX = (mouseX - width / 2 - offsetX) / zoomLevel;
    let adjustedMouseY = (mouseY - height / 2 - offsetY) / zoomLevel;

    for (let node of nodes) {
        let d = dist(adjustedMouseX, adjustedMouseY, node.x, node.y);
        if (d < 20) {
            tooltipTimeout = setTimeout(() => {
                let note = notes[node.label] || "Brak notatki dla tej umiejętności.";
                note = note.replace(/\n/g, '<br>'); // Zamiana \n na <br>
                tooltip.innerHTML = note; // Użyj innerHTML zamiast textContent
                tooltip.style.left = `${mouseX + 10}px`;
                tooltip.style.top = `${mouseY + 10}px`;
                tooltip.style.display = 'block';
            }, 1000);
            break;
        }
    }
}

function mouseOut() {
clearTimeout(tooltipTimeout);
const tooltip = document.getElementById('tooltip');
tooltip.style.display = 'none';
}

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

function mouseWheel(event) {
    event.preventDefault();

    if (event.deltaY < 0) {
        zoomLevel += zoomFactor;
    } else {
        zoomLevel -= zoomFactor;
    }

    zoomLevel = Math.min(Math.max(zoomLevel, 0.5), 3);
}

window.addEventListener('wheel', mouseWheel, { passive: false });

function handleLearning(node) {
    if (node.isProgressNode) {
        node.progress += 10; 
        if (node.progress >= 100) {
            node.progress = 100; 
            node.isActive = true;
        }
        return;
    }

    if (learnedSkills.has(node.label)) {
        return;
    }

    if (isSkillBlocked(node.label)) {
        showMessage("Nie możesz nauczyć się tej umiejętności, ponieważ została zablokowana.");
        return;
    }

    let parent = getParent(node);
    if (parent && !learnedSkills.has(parent.label)) {
        showMessage("Nie możesz nauczyć się tej umiejętności, ponieważ nie nauczyłeś się poprzedniej.");
        return;
    }

    showConfirmation(node);
}



function getParent(node) {
    for (let conn of connections) {
        if (conn[1] === node) {
            return conn[0];
        }
    }
    return null;
}

function showMessage(message) {
    const confirmationDiv = document.getElementById('confirmation');
    document.getElementById('confirmationText').textContent = message;
    confirmationDiv.style.display = 'block';
    document.getElementById('continue').style.display = 'none';
    document.getElementById('cancel').textContent = "OK";

    isModalOpen = true;

    document.getElementById('cancel').onclick = function() {
        confirmationDiv.style.display = 'none';
        document.getElementById('continue').style.display = 'inline-block';
        isModalOpen = false;
    };
}

function showConfirmation(node) {
    const confirmationDiv = document.getElementById('confirmation');
    document.getElementById('confirmationText').textContent =
        "Nauka tej dziedziny może zablokować dostęp do innych lub mocno ograniczyć ich rozwój. Czy na pewno chcesz kontynuować?";
    confirmationDiv.style.display = 'block';

    isModalOpen = true;

    document.getElementById('continue').style.display = 'inline-block';
    document.getElementById('cancel').textContent = "Anuluj";

    document.getElementById('continue').onclick = function() {
        learnSkill(node);
        confirmationDiv.style.display = 'none';
        isModalOpen = false;
    };

    document.getElementById('cancel').onclick = function() {
        confirmationDiv.style.display = 'none';
        isModalOpen = false;
    };
}



function undo() {
    if (history.length === 0) return;

    const lastLearnedSkill = history.pop();
    learnedSkills.delete(lastLearnedSkill);

    console.log(`Cofnięto umiejętność: ${lastLearnedSkill}`);

    // Usunięcie blokad powiązanych z tą umiejętnością
    if (skillBlocks[lastLearnedSkill]) {
        for (const blockedSkill of skillBlocks[lastLearnedSkill]) {
            blockedSkills.delete(blockedSkill);
        }
    }

    // Ponowna analiza warunkowych blokad
    for (const condition in skillBlocks) {
        if (condition.includes("+")) {
            const requiredSkills = condition.split(" + ");
            const allSkillsLearned = requiredSkills.every(skill => learnedSkills.has(skill));
            if (!allSkillsLearned) {
                for (const blockedSkill of skillBlocks[condition]) {
                    blockedSkills.delete(blockedSkill);
                }
            }
        }
    }

    // Dezaktywowanie węzła
    for (const node of nodes) {
        if (node.label === lastLearnedSkill) {
            node.isActive = false;
            break;
        }
    }

    // 🔹 Aktualizacja blokad po cofnięciu
    blockSubSkills();
    
    console.log("Nowe zablokowane umiejętności po cofnięciu:", blockedSkills);
}

function reset() {
    learnedSkills.clear(); 
    blockedSkills.clear(); 
    history = [];

    for (let node of nodes) {
        node.isActive = (node.label === "Gołodupiec"); 
    }
}

document.getElementById('undoButton').addEventListener('click', undo);
document.getElementById('resetButton').addEventListener('click', reset);

class Node {
    constructor(x, y, label, isProgressNode = false) {
        this.x = x;
        this.y = y;
        this.label = label;
        this.isActive = label === "Gołodupiec";
        this.isProgressNode = isProgressNode; 
        this.progress = 0;
    }
}


const mainSkills = ["Kowalstwo", "Stolarstwo", "Alchemictwo", "Łowiectwo", "Menelstwo", "Krawiectwo", "Karczmarstwo", "Złodziejstwo", "Strzelectwo"];

const branchToSubSkills = {
    "Kowalstwo": ["Kowal", "Miecznik", "Płatnerz"],
    "Stolarstwo": ["Stolarz"],
    "Alchemictwo": ["Alchemik", "Felczer"],
    "Łowiectwo": ["Myśliwy", "Rybak", "Garbarz"],
    "Menelstwo": ["Drwal", "Cieśla", "Zbieracz", "Farmer", "Górnik", "Hutnik"],
    "Krawiectwo": ["Krawiec", "Kaletnik", "Kuśnierz"],
    "Karczmarstwo": ["Gorzelnik", "Kucharz"],
    "Złodziejstwo": ["Złodziej"],
    "Strzelectwo": ["Łuczarz", "Kusznikarz"]
};
function blockSubSkills() {
    blockedSkills.clear();

    const selectedMainSkills = mainSkills.filter(skill => learnedSkills.has(skill));
    const selectedCount = selectedMainSkills.length;

    console.log("Wybrane główne umiejętności:", selectedMainSkills);

    if (selectedCount === 1) {
        const selectedSkill = selectedMainSkills[0];
        console.log(`Jedna wybrana umiejętność: ${selectedSkill}`);

        for (const branch in branchToSubSkills) {
            if (branch !== selectedSkill) {
                for (const subSkill of branchToSubSkills[branch]) {
                    blockedSkills.add(`${subSkill} T3`);
                    blockedSkills.add(`${subSkill} T4`);
                    blockedSkills.add(`${subSkill} T5`);
                }
            }
        }
    } else if (selectedCount === 2) {
        // 🔹 Znajdujemy pierwszą wybraną umiejętność według historii wyborów
        let firstSkill = null;
        let secondSkill = null;

        for (const skill of history) {
            if (selectedMainSkills.includes(skill)) {
                if (firstSkill === null) {
                    firstSkill = skill;
                } else {
                    secondSkill = skill;
                    break; // Mamy już dwie, więc wychodzimy
                }
            }
        }

        console.log(`Pierwsza wybrana: ${firstSkill}, Druga wybrana: ${secondSkill}`);

        // 🔹 1. Blokujemy wszystkie inne gałęzie (T1-T5)
        for (const branch in branchToSubSkills) {
            if (branch !== firstSkill && branch !== secondSkill) {
                for (const subSkill of branchToSubSkills[branch]) {
                    blockedSkills.add(`${subSkill} T1`);
                    blockedSkills.add(`${subSkill} T2`);
                    blockedSkills.add(`${subSkill} T3`);
                    blockedSkills.add(`${subSkill} T4`);
                    blockedSkills.add(`${subSkill} T5`);
                }
            }
        }

        // 🔹 2. Druga wybrana gałąź (T3-T5 ZABLOKOWANE)
        for (const subSkill of branchToSubSkills[secondSkill]) {
            blockedSkills.add(`${subSkill} T3`);
            blockedSkills.add(`${subSkill} T4`);
            blockedSkills.add(`${subSkill} T5`);
        }

        // 🔹 3. Pierwsza wybrana gałąź zostaje całkowicie odblokowana
        for (const subSkill of branchToSubSkills[firstSkill]) {
            blockedSkills.delete(`${subSkill} T1`);
            blockedSkills.delete(`${subSkill} T2`);
            blockedSkills.delete(`${subSkill} T3`);
            blockedSkills.delete(`${subSkill} T4`);
            blockedSkills.delete(`${subSkill} T5`);
        }
    }

    console.log("Zablokowane umiejętności:", blockedSkills);
}


function blockSkillsBasedOnConditions() {
    for (const condition in skillBlocks) {
        if (condition.includes("+")) {
            const requiredSkills = condition.split(" + ");
            const allSkillsLearned = requiredSkills.every(skill => learnedSkills.has(skill));
            if (allSkillsLearned) {
                for (const blockedSkill of skillBlocks[condition]) {
                    blockedSkills.add(blockedSkill);
                }
            }
        }
    }
}
// jprd ale bagno jak hk
function learnSkill(node) {
    learnedSkills.add(node.label);
    history.push(node.label);

    if (mainSkills.includes(node.label)) {
        blockSubSkills();
    }

    blockSkillsBasedOnConditions(); // Dodaj tę linię, aby blokować umiejętności na podstawie warunków

    node.isActive = true;
}

function isSkillBlocked(skill) {
    return blockedSkills.has(skill);
}