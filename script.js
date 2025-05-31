// 앙금 색깔 데이터
const colorMap = {
  AgCl: "흰색",
  AgBr: "연노란색",
  AgI: "노란색",
  Ag2CO3: "흰색",
  Ag2SO4: "흰색",
  Ag2S: "검은색",
  PbCl2: "흰색",
  PbBr2: "흰색",
  PbI2: "노란색",
  PbCO3: "흰색",
  PbSO4: "흰색",
  PbS: "검은색",
  CuCO3: "청록색",
  CuS: "검은색",
  ZnCO3: "흰색",
  ZnS: "흰색",
  BaCO3: "흰색",
  BaSO4: "흰색",
  CaCO3: "흰색",
  CaSO4: "흰색",
  MgCO3: "흰색"
};

// 앙금 이름 데이터
const nameMap = {
  AgCl: "염화 은",
  AgBr: "브롬화 은",
  AgI: "아이오딘화 은",
  Ag2CO3: "탄산 은(I)",
  Ag2SO4: "황산 은(I)",
  Ag2S: "황화 은(I)",
  PbCl2: "염화 납(II)",
  PbBr2: "브롬화 납(II)",
  PbI2: "아이오딘화 납(II)",
  PbCO3: "탄산 납(II)",
  PbSO4: "황산 납(II)",
  PbS: "황화 납(II)",
  CuCO3: "탄산 구리(II)",
  CuS: "황화 구리(II)",
  ZnCO3: "탄산 아연", 
  ZnS: "황화 아연",
  BaCO3: "탄산 바륨",
  BaSO4: "황산 바륨",
  CaCO3: "탄산 칼슘",
  CaSO4: "황산 칼슘",
  MgCO3: "탄산 마그네슘"
};

// 구성 원소 데이터
const elementMap = {
  AgCl: "Ag, Cl",
  AgBr: "Ag, Br",
  AgI: "Ag, I",
  Ag2CO3: "Ag, C, O",
  Ag2SO4: "Ag, S, O",
  Ag2S: "Ag, S",
  PbCl2: "Pb, Cl",
  PbBr2: "Pb, Br",
  PbI2: "Pb, I",
  PbCO3: "Pb, C, O",
  PbSO4: "Pb, S, O",
  PbS: "Pb, S",
  CuCO3: "Cu, C, O",
  CuS: "Cu, S",
  ZnCO3: "Zn, C, O",
  ZnS: "Zn, S",
  BaCO3: "Ba, C, O",
  BaSO4: "Ba, S, O",
  CaCO3: "Ca, C, O",
  CaSO4: "Ca, S, O",
  MgCO3: "Mg, C, O"
};

let selectedRow = null;
let selectedCol = null;

// 행(양이온) 선택
document.querySelectorAll("#precipitateTable tr").forEach((tr, rowIdx) => {
  if (rowIdx === 0) return; // 헤더 제외
  tr.querySelector("th").addEventListener("click", () => {
    // 기존 선택 해제
    document.querySelectorAll("#precipitateTable th.selected").forEach(th => th.classList.remove("selected"));
    tr.querySelector("th").classList.add("selected");
    selectedRow = rowIdx;
    showResult();
  });
});

// 열(음이온) 선택
document.querySelectorAll("#precipitateTable tr:first-child th").forEach((th, colIdx) => {
  if (colIdx === 0) return; // 맨 왼쪽 제외
  th.addEventListener("click", () => {
    document.querySelectorAll("#precipitateTable tr:first-child th.selected").forEach(th2 => th2.classList.remove("selected"));
    th.classList.add("selected");
    selectedCol = colIdx;
    showResult();
  });
});

function showResult() {
  const resultDiv = document.getElementById("result");
  if (selectedRow && selectedCol) {
    const cell = document.querySelector(`#precipitateTable tr:nth-child(${selectedRow+1}) td:nth-child(${selectedCol+1})`);
    if (cell && cell.dataset.formula) {
      const formula = cell.dataset.formula;
      const color = colorMap[formula] || "색 정보 없음";
      const name = nameMap[formula] || "이름 정보 없음";
      const elements = elementMap[formula] || "원소 정보 없음";
      resultDiv.innerHTML = `생성 앙금: <b>${formula}</b><br>이름: <b>${name}</b><br>색깔: <b>${color}</b><br>구성 원소: <b>${elements}</b>`;
    } else {
      resultDiv.textContent = "이 조합에서는 앙금이 생성되지 않습니다.";
    }
  }
} 