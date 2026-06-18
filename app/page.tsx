"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const total = 1183;
  const disconnect = 61;
  const normal = total - disconnect;
  const delay = 0;
  const disconnectRate = ((disconnect / total) * 100).toFixed(1);
  const [isDisplayModalOpen, setIsDisplayModalOpen] = useState(false);
  const [displayBrand, setDisplayBrand] = useState("");
const [displayName, setDisplayName] = useState("");
const [deviceCode, setDeviceCode] = useState("");
const [displayType, setDisplayType] = useState("LCD");
const [customDisplayType, setCustomDisplayType] = useState("");
const [startTime, setStartTime] = useState("");
const [endTime, setEndTime] = useState("");
const [isAllDay, setIsAllDay] = useState(false);
const [locationType, setLocationType] = useState("address");
const [displayAddress, setDisplayAddress] = useState("");
const [installEnvironment, setInstallEnvironment] = useState("실내");
const [viewDirection, setViewDirection] = useState("내부");
const [displayTag, setDisplayTag] = useState("");
const [displayStatusFilter, setDisplayStatusFilter] = useState("전체");
const [displayBrandFilter, setDisplayBrandFilter] = useState("전체");
const [displaySearchText, setDisplaySearchText] = useState("");
const [displaySearchType, setDisplaySearchType] = useState("name");
const [displayDetailTab, setDisplayDetailTab] = useState("manage");

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
    id: 1,
    name: "세로_260617_AD_프로모션.jpg",
    type: "이미지",
    resolution: "1080x1920",
    duration: "-",
    size: "753KB",
    tag: "세로형",
    date: "2026-06-16",
  },
  {
    id: 2,
    name: "KFC_치킨버켓_광고.mp4",
    type: "영상",
    resolution: "1080x1920",
    duration: "15.1초",
    size: "9.3MB",
    tag: "세로형",
    date: "2026-06-16",
  },
  {
    id: 3,
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
  const [displayList, setDisplayList] = useState<any[]>(displays);
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
const [contentList, setContentList] = useState<any[]>(initialContents);
const [isStorageLoaded, setIsStorageLoaded] = useState(false);
const [contentSearchText, setContentSearchText] = useState("");
const [contentBrandFilter, setContentBrandFilter] = useState("전체");
const [selectedContentNames, setSelectedContentNames] = useState<string[]>([]);
const [selectedContent, setSelectedContent] = useState<any>(null);
const [isEditMode, setIsEditMode] = useState(false);
const [editBrand, setEditBrand] = useState("");
const [editName, setEditName] = useState("");
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

const filteredDisplays = displayList.filter((display) => {
  const matchesStatus =
    displayStatusFilter === "전체" || display.status === displayStatusFilter;

  const matchesBrand =
    displayBrandFilter === "전체" || display.brand === displayBrandFilter;

  const searchTarget =
  displaySearchType === "deviceCode"
    ? display.deviceCode || ""
    : display.name || "";

const matchesSearch = searchTarget
  .toLowerCase()
  .includes(displaySearchText.toLowerCase());

  return matchesStatus && matchesBrand && matchesSearch;
});
const filteredContents = contentList.filter((content) => {
  const matchesSearch = content.name
    .toLowerCase()
    .includes(contentSearchText.toLowerCase());

  const matchesBrand =
    contentBrandFilter === "전체" ||
    content.brand === contentBrandFilter;

  return matchesSearch && matchesBrand;
});
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
useEffect(() => {
  const savedContents = localStorage.getItem("foreal-content-list");

  if (savedContents) {
    setContentList(JSON.parse(savedContents));
  }

  setIsStorageLoaded(true);
}, []);
useEffect(() => {
  if (!isStorageLoaded) return;

  const contentsForSave = contentList.map((content) => ({
    ...content,
    previewUrl: "",
  }));

  localStorage.setItem(
    "foreal-content-list",
    JSON.stringify(contentsForSave)
  );
}, [contentList, isStorageLoaded]);
const handleUpload = () => {
  if (selectedFiles.length === 0) {
    alert("등록할 파일을 선택해주세요.");
    return;
  }
const duplicateFiles = selectedFiles.filter((file) =>
  contentList.some(
    (content) =>
      content.name.trim().toLowerCase() ===
      file.name.trim().toLowerCase()
  )
);

if (duplicateFiles.length > 0) {
  alert(
    `이미 등록된 콘텐츠가 있습니다.\n\n${duplicateFiles
      .map((file) => file.name)
      .join("\n")}`
  );
  return;
}
const newContents = selectedFiles.map((file, index) => ({
  id:
  Math.max(0, ...contentList.map((content) => content.id || 0)) +
  index +
  1,
    name: file.name,
    type: getContentType(file.name),
    previewUrl: URL.createObjectURL(file),
    brand: uploadBrand || "미지정",
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
    contentList.filter((content) => content.id !== selectedContent.id)
  );

  setSelectedContent(null);
  setCurrentPage("content");
};
const handleDeleteSelectedContents = () => {
  if (selectedContentNames.length === 0) {
    alert("삭제할 콘텐츠를 선택해주세요.");
    return;
  }

  const isConfirmed = confirm(
    `${selectedContentNames.length}개의 콘텐츠를 삭제하시겠습니까?`
  );

  if (!isConfirmed) return;

  setContentList(
    contentList.filter(
      (content) => !selectedContentNames.includes(content.name)
    )
  );

  setSelectedContentNames([]);
};
const handleSaveEdit = () => {
  if (!selectedContent) return;

  const updatedContent = {
  ...selectedContent,
  name: editName,
  brand: editBrand || "미지정",
  tag: editTag || "미지정",
  startDate: editStartDate,
  endDate: editEndDate,
};

  setContentList(
    contentList.map((content) =>
      content.id === selectedContent.id ? updatedContent : content
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
const handleRegisterDisplay = () => {
  if (!displayBrand) {
    alert("브랜드를 선택해주세요.");
    return;
  }

  if (!displayName.trim()) {
    alert("디스플레이명을 입력해주세요.");
    return;
  }

  if (!deviceCode.trim()) {
    alert("디바이스코드를 입력해주세요.");
    return;
  }

  const nextNumber = displayList.length + 1;
  const newDisplay = {
    id: `DSP-${String(nextNumber).padStart(6, "0")}`,
    name: displayName,
    brand: displayBrand,
    deviceCode,
    displayType: displayType === "기타" ? customDisplayType : displayType,
    operationTime: isAllDay ? "종일" : `${startTime} ~ ${endTime}`,
    location: displayAddress || "미입력",
    environment: installEnvironment,
    viewDirection,
    tag: displayTag || "미지정",
    status: "등록대기",
    stbSerial: "STB 앱 연동 전",
    ip: "자동 수집 대기",
    last: "-",
  };

  setDisplayList([newDisplay, ...displayList]);

  setDisplayBrand("");
  setDisplayName("");
  setDeviceCode("");
  setDisplayType("LCD");
  setCustomDisplayType("");
  setStartTime("");
  setEndTime("");
  setIsAllDay(false);
  setLocationType("address");
  setDisplayAddress("");
  setInstallEnvironment("실내");
  setViewDirection("내부");
  setDisplayTag("");

  setIsDisplayModalOpen(false);
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
          <div
  style={currentPage === "display" ? activeMenuStyle : menuItemStyle}
  onClick={() => setCurrentPage("display")}
>
  디스플레이
</div>
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

      <div style={{ display: "flex", gap: "8px" }}>
  <button
    style={dangerButtonStyle}
    onClick={handleDeleteSelectedContents}
  >
    삭제
  </button>

  <button
    style={uploadButtonStyle}
    onClick={() => setIsUploadModalOpen(true)}
  >
    콘텐츠 등록
  </button>
</div>
    </section>
    <section style={panelStyle}>
      <div style={panelHeaderStyle}>
        <div style={{ display: "flex", gap: "10px" }}>
          <select
  style={selectStyle}
  value={contentBrandFilter}
  onChange={(e) => setContentBrandFilter(e.target.value)}
>
  <option value="전체">전체 브랜드</option>
  {brands.map((brand) => (
    <option key={brand.name} value={brand.name}>
      {brand.name}
    </option>
  ))}
</select>

          <input
  style={searchInputStyle}
  placeholder="콘텐츠명 검색"
  value={contentSearchText}
  onChange={(e) => setContentSearchText(e.target.value)}
/>
        </div>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: "50px" }}>NO</th>
<th style={{ ...thStyle, width: "100px", textAlign: "center" }}>
  <label style={checkAllStyle}>
    <input
      type="checkbox"
      checked={
        filteredContents.length > 0 &&
        filteredContents.every((content) =>
          selectedContentNames.includes(content.name)
        )
      }
      onChange={(e) => {
        if (e.target.checked) {
          setSelectedContentNames(
            filteredContents.map((content) => content.name)
          );
        } else {
          setSelectedContentNames([]);
        }
      }}
    />
    선택
  </label>
</th>
<th style={{ ...thStyle, width: "150px" }}>미리보기</th>
<th style={thStyle}>콘텐츠명</th>
<th style={{ ...thStyle, width: "110px" }}>브랜드</th>
            <th style={thStyle}>종류</th>
            <th style={thStyle}>해상도</th>
            <th style={thStyle}>재생시간</th>
            <th style={thStyle}>용량</th>
            <th style={thStyle}>태그</th>
            <th style={thStyle}>등록일</th>
          </tr>
        </thead>

        <tbody>
          {filteredContents.map((content, index) => (
            <tr
  key={content.name}
  onClick={() => {
        setSelectedContent(content);
    setCurrentPage("contentDetail");
  }}
  style={{ cursor: "pointer" }}
>
  <td style={tdStyle}>
  {contentList.length - index}
</td>

<td style={tdStyle}>
  <input
    type="checkbox"
    checked={selectedContentNames.includes(content.name)}
    onClick={(e) => e.stopPropagation()}
    onChange={(e) => {
      if (e.target.checked) {
        setSelectedContentNames([...selectedContentNames, content.name]);
      } else {
        setSelectedContentNames(
          selectedContentNames.filter((name) => name !== content.name)
        );
      }
    }}
  />
</td>
              <td style={tdStyle}>
                {content.type === "이미지" && content.previewUrl ? (
  <img
    src={content.previewUrl}
    alt={content.name}
    style={thumbnailImageStyle}
  />
) : (
  <div style={thumbnailStyle}>
    {content.type === "영상" ? "영상" : "썸네일"}
  </div>
)}
              </td>

              <td style={tdStyle}>
  <div style={{ fontWeight: 500 }}>
    {content.name}
  </div>

  <div
  style={{
    fontSize: "11px",
    color:
  !content.startDate && !content.endDate
    ? "#9CA3AF"
    : "#666"
  }}
>
  {
    !content.startDate && !content.endDate
      ? "무기한"
      : `${content.startDate || "즉시"} ~ ${content.endDate || "무기한"}`
  }
</div>
</td>

<td style={tdStyle}>{content.brand || "미지정"}</td>
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
{currentPage === "display" && (
  <div>
    <div style={panelStyle}>
      <div style={panelHeaderStyle}>
        <h2>디스플레이 관리</h2>
        <button
  style={uploadButtonStyle}
  onClick={() => setIsDisplayModalOpen(true)}
>
  디스플레이 등록
</button>
      </div>

      <p style={smallText}>
        설치된 디스플레이 및 STB 관리
      </p>
      <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
  <select
    style={selectStyle}
    value={displayStatusFilter}
    onChange={(e) => setDisplayStatusFilter(e.target.value)}
  >
    <option value="전체">네트워크 전체</option>
    <option value="정상">정상</option>
    <option value="끊김">끊김</option>
    <option value="등록대기">등록대기</option>
  </select>

  <select
    style={selectStyle}
    value={displayBrandFilter}
    onChange={(e) => setDisplayBrandFilter(e.target.value)}
  >
    <option value="전체">전체 브랜드</option>
    {brands.map((brand) => (
      <option key={brand.name} value={brand.name}>
        {brand.name}
      </option>
    ))}
  </select>

  <select
  style={selectStyle}
  value={displaySearchType}
  onChange={(e) => {
  setDisplaySearchType(e.target.value);
  setDisplaySearchText("");
}}
>
  <option value="name">디스플레이명</option>
  <option value="deviceCode">디바이스코드</option>
</select>

  <input
  style={searchInputStyle}
  placeholder={
    displaySearchType === "deviceCode"
      ? "디바이스코드 검색"
      : "디스플레이명 검색"
  }
  value={displaySearchText}
  onChange={(e) => setDisplaySearchText(e.target.value)}
/>
</div>

      <table style={tableStyle}>
        <thead>
         <tr>
  <th style={thStyle}>NO</th>
  <th style={thStyle}>네트워크 연결</th>
  <th style={thStyle}>스크린샷</th>
  <th style={thStyle}>브랜드</th>
  <th style={thStyle}>디스플레이명<br />디바이스코드</th>
  <th style={thStyle}>송출 해상도</th>
  <th style={thStyle}>운영시간</th>
  <th style={thStyle}>위치</th>
  <th style={thStyle}>태그</th>
</tr>
        </thead>

        <tbody>
  {filteredDisplays.map((display, index) => (
    <tr
  key={display.id || display.name}
  style={{ cursor: "pointer" }}
  onClick={() => {
    setSelectedDisplay(display);
    setCurrentPage("displayDetail");
  }}
>
      <td style={tdStyle}>{displayList.length - index}</td>

      <td style={tdStyle}>
        <span
          style={{
            ...statusBadgeStyle,
            color:
              display.status === "정상"
                ? "#34c759"
                : display.status === "등록대기"
                ? "#ff9500"
                : "#ff3b30",
          }}
        >
          ● {display.status}
        </span>
      </td>

      <td style={tdStyle}>
        <div style={thumbnailStyle}>스크린샷<br />준비 중</div>
      </td>

      <td style={tdStyle}>{display.brand}</td>

      <td style={tdStyle}>
        <div style={{ fontWeight: "bold", color: "#2563eb" }}>
          {display.name}
        </div>
        <div style={helperTextStyle}>
          {display.deviceCode || display.id || "-"}
        </div>
      </td>

      <td style={tdStyle}>{display.resolution || "1920x1080"}</td>

      <td style={tdStyle}>{display.operationTime || "종일"}</td>

      <td style={tdStyle}>{display.location || "-"}</td>

      <td style={tdStyle}>
        {display.tag && display.tag !== "미지정" ? (
          <span style={tagBadgeStyle}>{display.tag}</span>
        ) : (
          "-"
        )}
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  </div>
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
        {selectedContent.type === "이미지" && selectedContent.previewUrl ? (
  <img
    src={selectedContent.previewUrl}
    alt={selectedContent.name}
    style={contentPreviewImageStyle}
  />
) : (
  <div style={contentPreviewLargeStyle}>
    {selectedContent.type === "영상" ? "영상 콘텐츠" : "이미지 콘텐츠"}
  </div>
)}
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
  <label>콘텐츠명</label>
  <input
    style={modalInputStyle}
    value={editName}
    onChange={(e) => setEditName(e.target.value)}
  />
</div>

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
    setEditName(selectedContent.name || "");
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
{currentPage === "displayDetail" && selectedDisplay && (
  <>
    <section style={displayDetailHeaderStyle}>
  <div>
    <h1 style={{ margin: 0 }}>
      디스플레이 &gt; {selectedDisplay.name || "-"}
    </h1>

    <div style={displayStatusRowStyle}>
      <span
        style={{
          ...displayStatusDotStyle,
          backgroundColor:
            selectedDisplay.status === "정상"
              ? "#34c759"
              : selectedDisplay.status === "등록대기"
              ? "#ff9500"
              : "#ff3b30",
        }}
      />

      <strong
        style={{
          color:
            selectedDisplay.status === "정상"
              ? "#34c759"
              : selectedDisplay.status === "등록대기"
              ? "#ff9500"
              : "#ff3b30",
        }}
      >
        {selectedDisplay.status || "-"}
      </strong>
    </div>
  </div>

  <div style={{ display: "flex", gap: "8px" }}>
    <button
      style={smallButtonStyle}
      onClick={() => setCurrentPage("display")}
    >
      ← 목록으로
    </button>

    <button style={smallButtonStyle}>편성된 편성목록 &gt;</button>
    <button style={smallButtonStyle}>리포트 &gt;</button>
    <button style={dangerButtonStyle}>삭제</button>
  </div>
</section>
    <div style={tabMenuStyle}>
      <button
        style={displayDetailTab === "manage" ? activeTabStyle : tabButtonStyle}
        onClick={() => setDisplayDetailTab("manage")}
      >
        관리
      </button>

      <button
        style={displayDetailTab === "network" ? activeTabStyle : tabButtonStyle}
        onClick={() => setDisplayDetailTab("network")}
      >
        네트워크 연결
      </button>

      <button
        style={displayDetailTab === "screenshot" ? activeTabStyle : tabButtonStyle}
        onClick={() => setDisplayDetailTab("screenshot")}
      >
        스크린샷
      </button>
    </div>

    {displayDetailTab === "manage" && (
  <section style={detailGridStyle}>

  <div>
    <div style={panelStyle}>
      <div style={panelHeaderStyle}>
        <h2>디스플레이 기본 정보</h2>
        <button style={smallButtonStyle}>수정</button>
      </div>

      <div style={infoGridStyle}>
        <strong>브랜드</strong>
        <span>{selectedDisplay.brand || "-"}</span>

        <strong>디스플레이명</strong>
        <span>{selectedDisplay.name || "-"}</span>

        <strong>디바이스코드</strong>
        <span>{selectedDisplay.deviceCode || "-"}</span>

        <strong>종류</strong>
        <span>{selectedDisplay.displayType || "LCD"}</span>

        <strong>송출 해상도</strong>
        <span>{selectedDisplay.resolution || "1920x1080"}</span>

        <strong>운영 시간</strong>
        <span>{selectedDisplay.operationTime || "종일"}</span>

        <strong>위치</strong>
        <span>{selectedDisplay.location || "-"}</span>

        <strong>설치 환경</strong>
        <span>{selectedDisplay.environment || "실내"}</span>

        <strong>주 시야 방향</strong>
        <span>{selectedDisplay.viewDirection || "-"}</span>

        <strong>태그</strong>
        <span>{selectedDisplay.tag || "-"}</span>
      </div>
    </div>
    
    <div style={panelStyle}>
  <div style={panelHeaderStyle}>
    <h2>디바이스 제어</h2>

    <div style={{ display: "flex", gap: "8px" }}>
      <button style={smallButtonStyle}>재시작</button>
      <button style={smallButtonStyle}>편성 업데이트</button>
      <button style={smallButtonStyle}>저장소 초기화</button>
    </div>
  </div>

  <div style={controlRowStyle}>
    <strong>디스플레이 전원</strong>
    <div style={controlButtonGroupStyle}>
      <button style={smallButtonStyle}>켜기</button>
      <button style={smallButtonStyle}>끄기</button>
    </div>
  </div>

  <div style={controlRowStyle}>
    <strong>사운드</strong>
    <div style={controlButtonGroupStyle}>
      <input type="range" min="0" max="100" defaultValue="50" />
      <label style={radioLabelStyle}>
        <input type="checkbox" />
        CMS에서 음량 제어
      </label>
    </div>
  </div>

  <div style={controlRowStyle}>
    <strong>회전</strong>
    <select style={selectStyle} defaultValue="none">
      <option value="none">회전 안함</option>
      <option value="90">90도</option>
      <option value="180">180도</option>
      <option value="270">270도</option>
    </select>
  </div>

  <div style={controlRowStyle}>
    <strong>디버그 모드</strong>
    <div style={controlButtonGroupStyle}>
      <button style={smallButtonStyle}>켜기</button>
      <button style={smallButtonStyle}>끄기</button>
    </div>
  </div>

  <p style={helperTextStyle}>
    ※ 제어 기능은 STB가 네트워크에 연결되어 있고, FOREAL 플레이어 앱이 실행 중일 때 동작합니다.
  </p>
  </div>
</div>

    <div>
      <div style={panelStyle}>
        <h2>플레이어 앱</h2>

        <div style={infoGridStyle}>
          <strong>디바이스코드</strong>
          <span>{selectedDisplay.deviceCode || "-"}</span>

          <strong>앱 버전</strong>
          <span>{selectedDisplay.appVersion || "자동 수집 대기"}</span>

          <strong>마지막 통신</strong>
          <span>{selectedDisplay.last || "-"}</span>

          <strong>현재 콘텐츠</strong>
          <span>{selectedDisplay.content || "편성 전"}</span>
        </div>
      </div>

      <div style={panelStyle}>
        <h2>디바이스 정보</h2>

        <div style={infoGridStyle}>
          <strong>STB 시리얼</strong>
          <span>{selectedDisplay.stbSerial || "STB 앱 연동 전"}</span>

          <strong>OS</strong>
          <span>{selectedDisplay.osVersion || "자동 수집 대기"}</span>

          <strong>저장소</strong>
          <span>{selectedDisplay.storage || "자동 수집 대기"}</span>
        </div>
      </div>

      <div style={panelStyle}>
        <h2>네트워크</h2>

        <div style={infoGridStyle}>
          <strong>네트워크 상태</strong>
          <span>{selectedDisplay.status || "-"}</span>

          <strong>내부 IP</strong>
          <span>{selectedDisplay.ip || "자동 수집 대기"}</span>

          <strong>외부 IP</strong>
          <span>{selectedDisplay.publicIp || "자동 수집 대기"}</span>
        </div>
      </div>
    </div>
  </section>
  
)}
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

<label style={fileSelectButtonStyle}>
  파일 선택
  <input
    type="file"
    multiple
    style={{ display: "none" }}
    onChange={(e) =>
      setSelectedFiles(Array.from(e.target.files || []).slice(0, 50))
    }
  />
</label>

<p style={{ marginBottom: "8px" }}>
  선택 파일 {selectedFiles.length}개
</p>

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

      {selectedFiles.map((file, index) => (
  <div key={`${file.name}-${index}`} style={fileItemStyle}>
    <span>{file.name}</span>

    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <strong>{getContentType(file.name)}</strong>

      <button
        style={fileDeleteButtonStyle}
        onClick={() =>
          setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
        }
      >
        ×
      </button>
    </div>
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
  style={{
    ...uploadButtonStyle,
    opacity: selectedFiles.length === 0 ? 0.5 : 1,
    cursor: selectedFiles.length === 0 ? "not-allowed" : "pointer"
  }}
  onClick={handleUpload}
  disabled={selectedFiles.length === 0}
>
  등록
</button>
  <button
  style={closeButtonStyle}
  onClick={() => {
    setSelectedFiles([]);
    setUploadStartDate("");
    setUploadEndDate("");
    setUploadBrand("");
    setUploadTag("");
    setNewTag("");
    setIsUploadModalOpen(false);
  }}
>
  취소
</button>
</div>
    </div>
  </div>
)}
{isDisplayModalOpen && (
  <div style={modalOverlayStyle}>
    <div style={modalStyle}>
      <div style={modalHeaderStyle}>
        <h2>디스플레이 등록</h2>
      </div>

      <div style={formGroupStyle}>
  <label>브랜드 *</label>
  <select
    style={modalInputStyle}
    value={displayBrand}
    onChange={(e) => setDisplayBrand(e.target.value)}
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
  <label>디스플레이명 *</label>
  <input
    style={modalInputStyle}
    placeholder="디스플레이명 입력"
    value={displayName}
    onChange={(e) => setDisplayName(e.target.value)}
    maxLength={30}
  />
  <p style={helperTextStyle}>{displayName.length} / 30자</p>
</div>

<div style={formGroupStyle}>
  <label>디바이스코드 *</label>
  <input
    style={modalInputStyle}
    placeholder="셋톱 디바이스코드 입력"
    value={deviceCode}
    onChange={(e) => setDeviceCode(e.target.value)}
  />
</div>

<div style={formGroupStyle}>
  <label>종류 *</label>
  <div style={radioRowStyle}>
    {["LCD", "LED", "기타"].map((type) => (
      <label key={type} style={radioLabelStyle}>
        <input
          type="radio"
          checked={displayType === type}
          onChange={() => setDisplayType(type)}
        />
        {type}
      </label>
    ))}

    {displayType === "기타" && (
      <input
        style={modalInputStyle}
        placeholder="직접 입력"
        value={customDisplayType}
        onChange={(e) => setCustomDisplayType(e.target.value)}
      />
    )}
  </div>
</div>

<div style={formGroupStyle}>
  <label>운영시간 *</label>
  <div style={dateRowStyle}>
    <input
      type="time"
      style={modalInputStyle}
      value={startTime}
      onChange={(e) => setStartTime(e.target.value)}
      disabled={isAllDay}
    />
    <input
      type="time"
      style={modalInputStyle}
      value={endTime}
      onChange={(e) => setEndTime(e.target.value)}
      disabled={isAllDay}
    />
  </div>

  <label style={radioLabelStyle}>
    <input
      type="checkbox"
      checked={isAllDay}
      onChange={(e) => setIsAllDay(e.target.checked)}
    />
    종일
  </label>
</div>

<div style={formGroupStyle}>
  <label>위치</label>
  <div style={radioRowStyle}>
    <label style={radioLabelStyle}>
      <input
        type="radio"
        checked={locationType === "address"}
        onChange={() => setLocationType("address")}
      />
      주소 입력
    </label>

    <label style={radioLabelStyle}>
      <input
        type="radio"
        checked={locationType === "region"}
        onChange={() => setLocationType("region")}
      />
      행정구역까지만 입력
    </label>

    <label style={radioLabelStyle}>
      <input
        type="radio"
        checked={locationType === "none"}
        onChange={() => setLocationType("none")}
      />
      입력하지 않음
    </label>
  </div>

  {locationType !== "none" && (
    <input
      style={modalInputStyle}
      placeholder={locationType === "address" ? "지번 주소 입력" : "행정구역 입력"}
      value={displayAddress}
      onChange={(e) => setDisplayAddress(e.target.value)}
    />
  )}
</div>

<div style={formGroupStyle}>
  <label>설치환경 *</label>
  <div style={radioRowStyle}>
    {["실내", "실외"].map((item) => (
      <label key={item} style={radioLabelStyle}>
        <input
          type="radio"
          checked={installEnvironment === item}
          onChange={() => setInstallEnvironment(item)}
        />
        {item}
      </label>
    ))}
  </div>
</div>

<div style={formGroupStyle}>
  <label>주 시야 방향 *</label>
  <div style={radioRowStyle}>
    {["내부", "외부"].map((item) => (
      <label key={item} style={radioLabelStyle}>
        <input
          type="radio"
          checked={viewDirection === item}
          onChange={() => setViewDirection(item)}
        />
        {item}
      </label>
    ))}
  </div>
</div>

<div style={formGroupStyle}>
  <label>태그</label>
  <select
    style={modalInputStyle}
    value={displayTag}
    onChange={(e) => setDisplayTag(e.target.value)}
  >
    <option value="">태그 선택</option>
    {tagList.map((tag) => (
      <option key={tag} value={tag}>
        {tag}
      </option>
    ))}
  </select>
</div>

      <div style={modalFooterStyle}>
        <button
          style={closeButtonStyle}
          onClick={() => setIsDisplayModalOpen(false)}
        >
          취소
        </button>

        <button
  style={uploadButtonStyle}
  onClick={handleRegisterDisplay}
>
  등록
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
const tdStyle = { borderBottom: "1px solid #e5e7eb", padding: "12px", verticalAlign: "middle" as const, };
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
  maxHeight: "240px",
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
const thumbnailImageStyle = {
  width: "160px",
  height: "90px",
  objectFit: "cover" as const,
  borderRadius: "6px",
  border: "1px solid #d1d5db",
};

const contentPreviewImageStyle = {
  width: "100%",
  maxHeight: "420px",
  objectFit: "contain" as const,
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  backgroundColor: "#f3f4f6",
};
const fileSelectButtonStyle = {
  display: "inline-block",
  width: "120px",
  textAlign: "center" as const,
  backgroundColor: "#2563eb",
  color: "#ffffff",
  borderRadius: "6px",
  padding: "10px 14px",
  cursor: "pointer",
  fontWeight: "bold",
};

const fileDeleteButtonStyle = {
  border: "none",
  backgroundColor: "#ef4444",
  color: "#ffffff",
  borderRadius: "50%",
  width: "24px",
  height: "24px",
  cursor: "pointer",
  fontWeight: "bold",
};
const checkAllStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  padding: "6px 8px",
  borderRadius: "6px",
  border: "1px solid #e5e7eb",
  backgroundColor: "#ffffff",
};
const radioRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap" as const,
};

const radioLabelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
};
const tagBadgeStyle = {
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: "999px",
  backgroundColor: "#dcfce7",
  color: "#166534",
  fontSize: "12px",
  fontWeight: "bold",
};
const tabMenuStyle = {
  display: "flex",
  gap: "24px",
  borderBottom: "1px solid #e5e7eb",
  marginTop: "20px",
};

const tabButtonStyle = {
  border: "none",
  backgroundColor: "transparent",
  padding: "12px 4px",
  cursor: "pointer",
  color: "#6b7280",
};

const activeTabStyle = {
  ...tabButtonStyle,
  color: "#2563eb",
  borderBottom: "2px solid #2563eb",
  fontWeight: "bold",
};
const detailGridStyle = {
  display: "grid",
  gridTemplateColumns: "1.5fr 1fr",
  gap: "24px",
};

const infoGridStyle = {
  display: "grid",
  gridTemplateColumns: "160px 1fr",
  rowGap: "16px",
  columnGap: "20px",
  marginTop: "16px",
};
const controlRowStyle = {
  display: "grid",
  gridTemplateColumns: "160px 1fr",
  alignItems: "center",
  gap: "16px",
  padding: "14px 0",
  borderBottom: "1px solid #e5e7eb",
};

const controlButtonGroupStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};
const displayDetailHeaderStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "20px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const displayStatusRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "8px",
  fontSize: "14px",
};

const displayStatusDotStyle = {
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  display: "inline-block",
};