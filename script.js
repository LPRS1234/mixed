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

// 이온 정보 데이터
const ionInfo = {
  // 양이온
  'Ag⁺': '은 이온 (Ag⁺)\n1가 양이온',
  'Pb²⁺': '납 이온 (Pb²⁺)\n2가 양이온',
  'Cu²⁺': '구리(II) 이온 (Cu²⁺)\n2가 양이온',
  'Zn²⁺': '아연 이온 (Zn²⁺)\n2가 양이온',
  'Ba²⁺': '바륨 이온 (Ba²⁺)\n2가 양이온',
  'Ca²⁺': '칼슘 이온 (Ca²⁺)\n2가 양이온',
  'Mg²⁺': '마그네슘 이온 (Mg²⁺)\n2가 양이온',
  // 음이온
  'CO₃²⁻': '탄산 이온 (CO₃²⁻)\n2가 음이온',
  'SO₄²⁻': '황산 이온 (SO₄²⁻)\n2가 음이온',
  'S²⁻': '황 이온 (S²⁻)\n2가 음이온',
  'I⁻': '아이오딘화 이온 (I⁻)\n1가 음이온',
  'Cl⁻': '염화 이온 (Cl⁻)\n1가 음이온',
  'Br⁻': '브롬화 이온 (Br⁻)\n1가 음이온'
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

// 페이지 로드 시 이온 정보 툴팁 추가
window.addEventListener('DOMContentLoaded', () => {
  // 양이온(th, 첫번째 열)
  document.querySelectorAll('#precipitateTable tr:not(:first-child) th').forEach(th => {
    const ion = th.textContent.trim();
    if (ionInfo[ion]) th.title = ionInfo[ion];
  });
  // 음이온(th, 첫번째 행)
  document.querySelectorAll('#precipitateTable tr:first-child th:not(:first-child)').forEach(th => {
    const ion = th.textContent.trim();
    if (ionInfo[ion]) th.title = ionInfo[ion];
  });
}); 