"use client";

import { useState } from "react";

export default function Home() {
  const total = 1183;
  const disconnect = 61;
  const normal = total - disconnect;
  const delay = 0;
  const disconnectRate = ((disconnect / total) * 100).toFixed(1);

  const brands = [
  { name: "뚜레쥬르", count: 420, normal: 410, delay: 0, disconnect: 10 },
  { name: "KFC", count: 180, normal: 175, delay: 0, disconnect: 5 },
  { name: "CU", count: 160, normal: 158, delay: 1, disconnect: 1 },
  { name: "GS25", count: 130, normal: 126, delay: 1, disconnect: 3 },
  { name: "펫닥", count: 80, normal: 78, delay: 0, disconnect: 2 },
  { name: "우유자조금", count: 55, normal: 54, delay: 0, disconnect: 1 },
];

  const displays = [
    {
      name: "TBJ_강남역점_메뉴보드01",
      brand: "뚜레쥬르",
      region: "서울",
      status: "정상",
      content: "신제품 프로모션",
      last: "5분 전",
      location: "카운터 상단 좌측",
      network: "온라인",
      appVersion: "v1.0.3",
      stbSerial: "STB-TBJ-0001",
      ip: "192.168.0.21",
    },
    {
      name: "KFC_부산서면점_메뉴보드01",
      brand: "KFC",
      region: "부산",
      status: "끊김",
      content: "치킨 버켓 광고",
      last: "2시간 전",
      location: "주문 카운터 중앙",
      network: "오프라인",
      appVersion: "v1.0.2",
      stbSerial: "STB-KFC-0007",
      ip: "통신 불가",
    },
    {
      name: "CU_수원역점_광고모니터01",
      brand: "CU",
      region: "경기",
      status: "정상",
      content: "편의점 행사",
      last: "3분 전",
      location: "입구 우측 벽면",
      network: "온라인",
      appVersion: "v1.0.3",
      stbSerial: "STB-CU-0012",
      ip: "192.168.0.44",
    },
  ];
  const initialContents = [
  {
    name: "세로_260617_AD_프로모션.jpg",
    type: "이미지",
    resolution: "1080x1920",
    duration: "-",
    size: "753KB",
    tag: "세로형",
    date: "2026-06-16",
  },
  {
    name: "KFC_치킨버켓_광고.mp4",
    type: "영상",
    resolution: "1080x1920",
    duration: "15.1초",
    size: "9.3MB",
    tag: "세로형",
    date: "2026-06-16",
  },
  {
    name: "CU_여름행사_배너.png",
    type: "이미지",
    resolution: "1080x1920",
    duration: "-",
    size: "1.9MB",
    tag: "행사",
    date: "2026-06-15",
  },
];

  const [selectedDisplay, setSelectedDisplay] = useState(displays[0]);
const [selectedBrand, setSelectedBrand] = useState("전체");
const [currentPage, setCurrentPage] = useState("dashboard");
const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
const [newTag, setNewTag] = useState("");
const [tagList, setTagList] = useState([
  "세로형",
  "가로형",
  "이벤트",
  "신제품",
  "프로모션",
]);
const [contentList, setContentList] = useState(initialContents);
const [selectedContent, setSelectedContent] = useState<any>(null);
const [isEditMode, setIsEditMode] = useState(false);
const [editBrand, setEditBrand] = useState("");
const [editTag, setEditTag] = useState("");
const [editStartDate, setEditStartDate] = useState("");
const [editEndDate, setEditEndDate] = useState("");
const [uploadStartDate, setUploadStartDate] = useState("");
const [uploadEndDate, setUploadEndDate] = useState("");
const [uploadBrand, setUploadBrand] = useState("");
const [uploadTag, setUploadTag] = useState("");
const selectedBrandData = brands.find((brand) => brand.name === selectedBrand);

const dashboardTotal = selectedBrandData ? selectedBrandData.count : total;
const dashboardNormal = selectedBrandData ? selectedBrandData.normal : normal;
const dashboardDelay = selectedBrandData ? selectedBrandData.delay : delay;
const dashboardDisconnect = selectedBrandData
  ? selectedBrandData.disconnect
  : disconnect;
const dashboardDisconnectRate = (
  (dashboardDisconnect / dashboardTotal) *
  100
).toFixed(1);
  const [searchText, setSearchText] = useState("");

const filteredDisplays = displays.filter((display) =>
  display.name.toLowerCase().includes(searchText.toLowerCase())
);
const getContentType = (fileName: string) => {
  const lower = fileName.toLowerCase();

  if (
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".png") ||
    lower.endsWith(".gif") ||
    lower.endsWith(".webp")
  ) {
    return "이미지";
  }

  if (
    lower.endsWith(".mp4") ||
    lower.endsWith(".mov") ||
    lower.endsWith(".avi") ||
    lower.endsWith(".webm")
  ) {
    return "영상";
  }

  return "기타";
};
const getFileSize = (size: number) => {
  if (size >= 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(1)}MB`;
  }

  return `${Math.round(size / 1024)}KB`;
};

const handleUpload = () => {
  if (selectedFiles.length === 0) {
    alert("파일을 선택해주세요.");
    return;
  }

  if (!uploadBrand) {
    alert("브랜드를 선택해주세요.");
    return;
  }

  const newContents = selectedFiles.map((file) => ({
    name: file.name,
    type: getContentType(file.name),
    resolution: "-",
    duration: "-",
    size: getFileSize(file.size),
    tag: uploadTag || "미지정",
    startDate: uploadStartDate,
endDate: uploadEndDate,
    date: new Date().toISOString().slice(0, 10),
  }));

  setContentList([...newContents, ...contentList]);

  setSelectedFiles([]);
  setUploadStartDate("");
  setUploadEndDate("");
  setUploadBrand("");
  setUploadTag("");
  setNewTag("");
  setIsUploadModalOpen(false);
};
const handleDeleteContent = () => {
  if (!selectedContent) return;

  const isConfirmed = confirm("이 콘텐츠를 삭제하시겠습니까?");

  if (!isConfirmed) return;

  setContentList(
    contentList.filter((content) => content.name !== selectedContent.name)
  );

  setSelectedContent(null);
  setCurrentPage("content");
};
const handleSaveEdit = () => {
  if (!selectedContent) return;

  const updatedContent = {
    ...selectedContent,
    brand: editBrand,
    tag: editTag,
    startDate: editStartDate,
    endDate: editEndDate,
  };

  setContentList(
    contentList.map((content) =>
      content.name === selectedContent.name ? updatedContent : content
    )
  );

  setSelectedContent(updatedContent);
  setIsEditMode(false);
};
const handleAddTag = () => {
  const trimmedTag = newTag.trim();

  if (!trimmedTag) {
    alert("추가할 태그명을 입력해주세요.");
    return;
  }

  if (tagList.includes(trimmedTag)) {
    alert("이미 존재하는 태그입니다.");
    return;
  }

  setTagList([...tagList, trimmedTag]);
  setUploadTag(trimmedTag);
  setNewTag("");
};
  return (
    <main style={pageStyle}>
      <aside style={sidebarStyle}>
        <h2 style={logoStyle}>FOREAL CMS</h2>
        <p style={smallText}>마스터</p>

        <nav style={menuStyle}>
          <div
  style={currentPage === "dashboard" ? activeMenuStyle : menuItemStyle}
  onClick={() => setCurrentPage("dashboard")}
>
  대시보드
</div>

<div
  style={currentPage === "content" ? activeMenuStyle : menuItemStyle}
  onClick={() => setCurrentPage("content")}
>

  콘텐츠 관리
</div>
          <div style={menuItemStyle}>편성 관리</div>
          <div style={menuItemStyle}>디스플레이</div>
          <div style={menuItemStyle}>리포트</div>
          <div style={menuItemStyle}>점포 관리</div>
        </nav>
      </aside>

      <section style={contentStyle}>
        <header style={topbarStyle}>
          <strong>FOREAL Digital Signage CMS</strong>
          <span>son@foreal.kr</span>
        </header>

        <div style={bodyStyle}>
          {currentPage === "dashboard" && (
<>
          <section style={summaryBoxStyle}>
            <div>
              <h1>대시보드</h1>
              <p style={smallText}>디지털 사이니지 통합 관리 현황</p>
            </div>
            <strong>끊김율 {dashboardDisconnectRate}%</strong>
          </section>

          <section style={panelStyle}>
  <div style={panelHeaderStyle}>
    <h2>디스플레이 정보</h2>

    <select
      style={selectStyle}
      value={selectedBrand}
      onChange={(e) => setSelectedBrand(e.target.value)}
    >
      <option value="전체">전체 브랜드</option>
      {brands.map((brand) => (
        <option key={brand.name} value={brand.name}>
          {brand.name}
        </option>
      ))}
    </select>
  </div>

            <div style={cardWrapStyle}>
  <div style={cardStyle}>
    <p>전체</p>
    <strong>{dashboardTotal}</strong>
  </div>

  <div style={cardStyle}>
    <p>정상</p>
    <strong style={{ color: "#34c759" }}>{dashboardNormal}</strong>
  </div>

  <div style={cardStyle}>
    <p>지연</p>
    <strong style={{ color: "#ff9500" }}>{dashboardDelay}</strong>
  </div>

  <div style={cardStyle}>
    <p>끊김</p>
    <strong style={{ color: "#ff3b30" }}>{dashboardDisconnect}</strong>
  </div>
</div>
</section>

          <section style={panelStyle}>
            <div style={panelHeaderStyle}>
              <h2>브랜드별 설치 수량</h2>
              <button style={smallButtonStyle}>더보기</button>
            </div>

            <div style={brandGridStyle}>
              {brands.map((brand) => (
                <div key={brand.name} style={brandCardStyle}>
                  <span>{brand.name}</span>
                  <strong>{brand.count}대</strong>
                </div>
              ))}
            </div>
          </section>

          <section style={twoColumnStyle}>
            <div style={panelStyle}>
              <div style={panelHeaderStyle}>
                <h2>디스플레이 현황</h2>
                <input
  style={searchInputStyle}
  placeholder="디스플레이명 검색"
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
/>
              </div>

              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>썸네일</th>
                    <th style={thStyle}>디스플레이명</th>
                    <th style={thStyle}>브랜드</th>
                    <th style={thStyle}>상태</th>
                    <th style={thStyle}>마지막 통신</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDisplays.map((display) => (
                    <tr
  key={display.name}
  onClick={() => setSelectedDisplay(display)}
  style={{
    cursor: "pointer",
    backgroundColor:
      selectedDisplay.name === display.name ? "#eef2ff" : "#ffffff",
  }}
>
                      <td style={tdStyle}>
                        <div style={thumbnailStyle}>썸네일</div>
                      </td>
                      <td style={tdStyle}>{display.name}</td>
                      <td style={tdStyle}>{display.brand}</td>
                      <td style={tdStyle}>
                        <span style={{
                          ...statusBadgeStyle,
                          color: display.status === "정상" ? "#34c759" : display.status === "지연" ? "#ff9500" : "#ff3b30",
                        }}>
                          {display.status}
                        </span>
                      </td>
                      <td style={tdStyle}>{display.last}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={panelStyle}>
              <h2>디스플레이 상세정보</h2>

              <div style={detailThumbnailStyle}>현재 송출 콘텐츠</div>

              <p><strong>디스플레이명</strong><br />{selectedDisplay.name}</p>
              <p><strong>브랜드</strong><br />{selectedDisplay.brand}</p>
              <p><strong>설치 위치</strong><br />{selectedDisplay.location}</p>
              <p><strong>네트워크 상태</strong><br />{selectedDisplay.network}</p>
              <p><strong>앱 버전</strong><br />{selectedDisplay.appVersion}</p>
              <p><strong>STB 시리얼</strong><br />{selectedDisplay.stbSerial}</p>
              <p><strong>IP 주소</strong><br />{selectedDisplay.ip}</p>
              <p><strong>마지막 통신</strong><br />{selectedDisplay.last}</p>
            </div>
          </section>
          </>
          )}
          {currentPage === "content" && (
  <>
    <section style={summaryBoxStyle}>
      <div>
        <h1>콘텐츠 관리</h1>
        <p style={smallText}>
          등록된 이미지 및 영상 콘텐츠 관리
        </p>
      </div>

      <button
  style={uploadButtonStyle}
  onClick={() => setIsUploadModalOpen(true)}
>
  콘텐츠 등록
</button>
    </section>

    <section style={panelStyle}>
      <div style={panelHeaderStyle}>
        <div style={{ display: "flex", gap: "10px" }}>
          <select style={selectStyle}>
            <option>전체</option>
            <option>이미지</option>
            <option>영상</option>
          </select>

          <input
            style={searchInputStyle}
            placeholder="콘텐츠명 검색"
          />
        </div>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>미리보기</th>
            <th style={thStyle}>콘텐츠명</th>
            <th style={thStyle}>종류</th>
            <th style={thStyle}>해상도</th>
            <th style={thStyle}>재생시간</th>
            <th style={thStyle}>용량</th>
            <th style={thStyle}>태그</th>
            <th style={thStyle}>등록일</th>
          </tr>
        </thead>

        <tbody>
          {contentList.map((content) => (
            <tr
  key={content.name}
  onClick={() => {
        setSelectedContent(content);
    setCurrentPage("contentDetail");
  }}
  style={{ cursor: "pointer" }}
>
              <td style={tdStyle}>
                <div style={thumbnailStyle}>썸네일</div>
              </td>

              <td style={tdStyle}>{content.name}</td>
              <td style={tdStyle}>{content.type}</td>
              <td style={tdStyle}>{content.resolution}</td>
              <td style={tdStyle}>{content.duration}</td>
              <td style={tdStyle}>{content.size}</td>
              <td style={tdStyle}>{content.tag}</td>
              <td style={tdStyle}>{content.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  </>
)}
 {currentPage === "contentDetail" && selectedContent && (
  <>
    <section style={summaryBoxStyle}>
      <div>
        <h1>콘텐츠 상세정보</h1>
        <p style={smallText}>콘텐츠 파일 및 송출 정보 확인</p>
      </div>

      <button
        style={smallButtonStyle}
        onClick={() => setCurrentPage("content")}
      >
        ← 목록으로
      </button>
    </section>

    <section style={twoColumnStyle}>
      <div style={panelStyle}>
        <h2>미리보기</h2>
        <div style={contentPreviewLargeStyle}>
          {selectedContent.type === "영상" ? "영상 콘텐츠" : "이미지 콘텐츠"}
        </div>
      </div>

      <div style={panelStyle}>
        <h2>콘텐츠 정보</h2>

        <p><strong>콘텐츠명</strong><br />{selectedContent.name}</p>
        <p><strong>브랜드</strong><br />{selectedContent.brand || "미지정"}</p>
        <p><strong>태그</strong><br />{selectedContent.tag || "미지정"}</p>
        <p><strong>콘텐츠 종류</strong><br />{selectedContent.type}</p>
        <p><strong>해상도</strong><br />{selectedContent.resolution}</p>
        <p><strong>재생시간</strong><br />{selectedContent.duration}</p>
        <p><strong>용량</strong><br />{selectedContent.size}</p>
        <p>
          <strong>송출 기간</strong><br />
          {(selectedContent.startDate || "즉시") + " ~ " + (selectedContent.endDate || "무기한")}
        </p>
        <p><strong>등록일</strong><br />{selectedContent.date}</p>

        {isEditMode && (
  <div style={{ marginTop: "20px" }}>
    <h3>콘텐츠 정보 수정</h3>

    <div style={formGroupStyle}>
      <label>브랜드</label>
      <select
        style={modalInputStyle}
        value={editBrand}
        onChange={(e) => setEditBrand(e.target.value)}
      >
        <option value="">브랜드 선택</option>
        {brands.map((brand) => (
          <option key={brand.name} value={brand.name}>
            {brand.name}
          </option>
        ))}
      </select>
    </div>

    <div style={formGroupStyle}>
      <label>태그</label>
      <select
        style={modalInputStyle}
        value={editTag}
        onChange={(e) => setEditTag(e.target.value)}
      >
        <option value="">태그 선택</option>
        {tagList.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>

    <div style={dateRowStyle}>
      <div style={formGroupStyle}>
        <label>송출 시작일</label>
        <input
          type="date"
          style={modalInputStyle}
          value={editStartDate}
          onChange={(e) => setEditStartDate(e.target.value)}
        />
      </div>

      <div style={formGroupStyle}>
        <label>송출 종료일</label>
        <input
          type="date"
          style={modalInputStyle}
          value={editEndDate}
          onChange={(e) => setEditEndDate(e.target.value)}
        />
      </div>
    </div>

    <div style={modalFooterStyle}>
      <button
        style={closeButtonStyle}
        onClick={() => setIsEditMode(false)}
      >
        취소
      </button>

      <button
        style={uploadButtonStyle}
        onClick={handleSaveEdit}
      >
        저장
      </button>
    </div>
  </div>
)}
        <div style={modalFooterStyle}>
          <button
  style={smallButtonStyle}
  onClick={() => {
    setEditBrand(selectedContent.brand || "");
    setEditTag(selectedContent.tag || "");
    setEditStartDate(selectedContent.startDate || "");
    setEditEndDate(selectedContent.endDate || "");
    setIsEditMode(true);
  }}
  
>
  수정
</button>
          <button
  style={dangerButtonStyle}
  onClick={handleDeleteContent}
>
  삭제
</button>
        </div>
      </div>
    </section>
  </>
)}
        </div>
      </section>
      {isUploadModalOpen && (
  <div style={modalOverlayStyle}>
    <div style={modalStyle}>
      <div style={modalHeaderStyle}>
        <h2>콘텐츠 등록</h2>
</div>

      <div style={formGroupStyle}>
  <label>파일 선택</label>

  <input
    type="file"
    multiple
    onChange={(e) =>
      setSelectedFiles(Array.from(e.target.files || []).slice(0, 50))
    }
  />

  <p style={helperTextStyle}>
    1개부터 최대 50개까지 일괄 등록할 수 있습니다.
  </p>

  {selectedFiles.length === 0 && (
    <div style={emptyFileBoxStyle}>
      선택된 파일이 없습니다.
    </div>
  )}

  {selectedFiles.length > 0 && (
    <div style={fileListStyle}>
      <p style={helperTextStyle}>
        선택 파일 {selectedFiles.length}개
      </p>

      {selectedFiles.map((file) => (
        <div key={file.name} style={fileItemStyle}>
          <span>{file.name}</span>
          <strong>{getContentType(file.name)}</strong>
        </div>
      ))}
    </div>
  )}
</div>

<div style={dateRowStyle}>
  <div style={formGroupStyle}>
    <label>송출 시작일</label>
    <input
  type="date"
  style={modalInputStyle}
  value={uploadStartDate}
  onChange={(e) => setUploadStartDate(e.target.value)}
/>
  </div>

  <div style={formGroupStyle}>
    <label>송출 종료일</label>
    <input
  type="date"
  style={modalInputStyle}
  value={uploadEndDate}
  onChange={(e) => setUploadEndDate(e.target.value)}
/>
  </div>
</div>

<div style={formGroupStyle}>
  <label>브랜드</label>
  <select
  style={modalInputStyle}
  value={uploadBrand}
  onChange={(e) => setUploadBrand(e.target.value)}
>
  <option value="">브랜드 선택</option>
    <option>브랜드 선택</option>
    {brands.map((brand) => (
      <option key={brand.name}>{brand.name}</option>
    ))}
  </select>
</div>

<div style={formGroupStyle}>
  <label>태그</label>

  <div style={tagRowStyle}>
    <select
  style={modalInputStyle}
  value={uploadTag}
  onChange={(e) => setUploadTag(e.target.value)}
>
  <option value="">태그 선택</option>
      <option>태그 선택</option>
      {tagList.map((tag) => (
  <option key={tag} value={tag}>
    {tag}
  </option>
))}
    </select>

    <button
  style={closeButtonStyle}
  onClick={handleAddTag}
>
  + 태그 추가
</button>
    
  </div>

  <input
    style={modalInputStyle}
    placeholder="새 태그명 입력"
    value={newTag}
    onChange={(e) => setNewTag(e.target.value)}
  />
</div>
<div style={modalFooterStyle}>
    <button
    style={uploadButtonStyle}
    onClick={handleUpload}
  >
    등록
  </button>
  <button
    style={closeButtonStyle}
    onClick={() => setIsUploadModalOpen(false)}
  >
    취소
  </button>
</div>
    </div>
  </div>
)}
    </main>
  );
}

const pageStyle = { display: "flex", minHeight: "100vh", fontFamily: "Arial", backgroundColor: "#f4f6f9" };
const sidebarStyle = { width: "220px", backgroundColor: "#ffffff", borderRight: "1px solid #e5e7eb", padding: "24px" };
const logoStyle = { margin: "0 0 4px 0", fontSize: "20px" };
const smallText = { color: "#6b7280", fontSize: "14px" };
const menuStyle = { marginTop: "40px", display: "flex", flexDirection: "column" as const, gap: "12px" };
const menuItemStyle = { padding: "12px", borderRadius: "8px", color: "#374151" };
const activeMenuStyle = { padding: "12px", borderRadius: "8px", backgroundColor: "#172033", color: "#ffffff", fontWeight: "bold" };
const contentStyle = { flex: 1 };
const topbarStyle = { height: "64px", backgroundColor: "#172033", color: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 32px" };
const bodyStyle = { padding: "32px" };
const summaryBoxStyle = { backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" };
const panelStyle = { backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "24px", marginTop: "24px" };
const panelHeaderStyle = { display: "flex", justifyContent: "space-between", alignItems: "center" };
const cardWrapStyle = { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginTop: "20px" };
const cardStyle = { border: "1px solid #e5e7eb", borderRadius: "8px", padding: "28px", textAlign: "center" as const, backgroundColor: "#ffffff", fontSize: "18px" };
const brandGridStyle = { display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px", marginTop: "16px" };
const brandCardStyle = { border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px", display: "flex", justifyContent: "space-between", backgroundColor: "#f9fafb" };
const smallButtonStyle = { border: "1px solid #d1d5db", backgroundColor: "#ffffff", borderRadius: "6px", padding: "8px 12px", cursor: "pointer" };
const searchInputStyle = { width: "220px", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" };
const tableStyle = { width: "100%", borderCollapse: "collapse" as const, marginTop: "16px" };
const thStyle = { borderBottom: "1px solid #e5e7eb", padding: "12px", textAlign: "left" as const, backgroundColor: "#f9fafb", color: "#374151" };
const tdStyle = { borderBottom: "1px solid #e5e7eb", padding: "12px" };
const thumbnailStyle = { width: "100px", height: "56px", borderRadius: "6px", backgroundColor: "#d1d5db", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#374151" };
const statusBadgeStyle = { fontWeight: "bold" };
const twoColumnStyle = { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" };
const detailThumbnailStyle = { height: "160px", borderRadius: "8px", backgroundColor: "#d1d5db", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", color: "#374151" };
const selectStyle = {
  width: "180px",
  padding: "10px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  backgroundColor: "#ffffff",
};
const uploadButtonStyle = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  padding: "10px 16px",
  cursor: "pointer",
};
const modalOverlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  width: "750px",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  padding: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const modalHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const closeButtonStyle = {
  border: "1px solid #d1d5db",
  backgroundColor: "#ffffff",
  borderRadius: "6px",
  padding: "8px 12px",
  cursor: "pointer",
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "8px",
  marginBottom: "16px",
};

const modalInputStyle = {
  padding: "10px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
};

const modalFooterStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "24px",
};
const fileListStyle = {
  marginTop: "10px",
  border: "1px solid #e5e7eb",
  borderRadius: "6px",
  padding: "10px",
  backgroundColor: "#f9fafb",
  maxHeight: "120px",
  overflowY: "auto" as const,
};

const fileItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "6px 0",
  borderBottom: "1px solid #e5e7eb",
};

const dateRowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
};
const emptyFileBoxStyle = {
  border: "1px dashed #d1d5db",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center" as const,
  color: "#6b7280",
  backgroundColor: "#f9fafb",
};
const helperTextStyle = {
  fontSize: "13px",
  color: "#6b7280",
  margin: "4px 0",
};
const tagRowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 120px",
  gap: "8px",
};
const contentPreviewLargeStyle = {
  height: "420px",
  borderRadius: "10px",
  backgroundColor: "#d1d5db",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#374151",
  fontSize: "18px",
};

const dangerButtonStyle = {
  border: "none",
  backgroundColor: "#ef4444",
  color: "#ffffff",
  borderRadius: "6px",
  padding: "8px 12px",
  cursor: "pointer",
};
