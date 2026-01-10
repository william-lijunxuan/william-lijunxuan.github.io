const DATA = {
  projects: [
    {
      title: "Skinalor — Offline Dermatology Assistant",
      titleLink: "https://www.linkedin.com/posts/junxuan-li-william_skinalor-an-offline-on-device-dermatology-activity-7405392337754824704-wgmD/",
      badge: "VLM + RAG • Android Edge",
      desc: "A privacy-first, fully offline workflow from user intake to structured report generation with deployment-aware optimization.",
      bullets: [
        "End-to-end pipeline: image capture + text intake → retrieval augmentation → VLM inference → explanation/report generation",
        "Adapted and benchmarked MedGemma-4B and Lingshu-7B for mobile; improved recognition via LoRA fine-tuning",
        "Enabled low-latency on-device inference via 4-bit AWQ quantization and MNN conversion (~24 tokens/s)",
        "Built multimodal vector store (image + text) using CLIP embeddings in ChromaDB",
        "Introduced query labeling + Top@K recall evaluation; improved multimodal retrieval recall from 63% to 88%",
        "Applied HyDE-based rewriting + retrieval fusion for descriptive queries; improved Top-3 recall by 22%"
      ],
      tags: ["Multimodal RAG", "CLIP", "ChromaDB", "LoRA", "AWQ 4-bit", "MNN", "Android"],
      links: {
        repo: "",
        demo: ""
      }
    },
    {
      title: "MediAgent Hub — Healthcare Agent Platform",
      badge: "Agents • Workflow Engine",
      desc: "A LangGraph-based agent workflow engine with streaming and memory, designed for consultation and recommendation scenarios.",
      bullets: [
        "Built a LangGraph workflow engine with ReAct-style tool orchestration",
        "Implemented bidirectional WebSocket streaming for tool status and generation progress",
        "Designed one-click authorization/provisioning for doctor agents; async services via message queue",
        "Added long-term, cross-session memory with automatic high-value info extraction and summarization",
        "Contributed to enterprise migration toward DAG-based engine; personalized RAG for doctors (80% agreement in blinded evaluations)"
      ],
      tags: ["LangGraph", "ReAct", "WebSocket", "RAG", "Workflow", "Agent Platform"],
      links: {
        repo: "",
        demo: ""
      }
    }
  ],

  experience: [
    {
      title: "CITIC Consumer Finance — Senior Java Software Engineer (Beijing)",
      sub: "Owned and delivered microservices across intake, risk checks, decisioning, contracts, post-loan monitoring, and collections.",
      bullets: [
        "Designed real-time risk control with Flink + HBase; improved automated approval rate by 15% and interception accuracy by ~8%",
        "Optimized 50+ slow queries; reduced P99 latency of core APIs by ~40%",
        "Integrated Drools to decouple 2,000+ rules and enable visual configuration and hot updates"
      ],
      tags: ["Java", "Spring Boot/Cloud", "Flink", "HBase", "Oracle", "Redis", "Drools"]
    },
    {
      title: "Zhongguancun Bank — Intermediate Java Software Engineer (Beijing)",
      sub: "Migration and refactoring work for Huiye Loan platform with stability ownership in production.",
      bullets: [
        "Led migration of Huiye Loan 2.0 to 3.0; refactored core modules with Spring Boot",
        "Delivered high-concurrency API integrations via ESB to support fast disbursement experiences",
        "Tuned Oracle execution plans and tracing; sustained ~99.9% annual availability"
      ],
      tags: ["Java", "Spring Boot", "Oracle", "ESB", "High Concurrency", "Tracing"]
    },
    {
      title: "Sinosoft — Junior Java Software Engineer (Beijing)",
      sub: "Core installment logic and integration services with performance tuning for reporting.",
      bullets: [
        "Built premium calculation and interest accrual logic with settlement consistency",
        "Developed integration services for bancassurance platform; improved turnaround time",
        "Maintained and tuned Informix stored procedures; improved report generation speed by ~20%"
      ],
      tags: ["Java", "Informix", "Stored Procedures", "Integration", "Performance"]
    }
  ],

  skills: [
    { group: "Languages", items: ["Java", "Python", "Kotlin"] },
    { group: "Backend & Data", items: ["Spring Boot", "Spring Cloud", "Oracle", "Redis", "Kafka", "RocketMQ", "Spark", "Flink"] },
    { group: "RAG & Agents", items: ["Milvus", "ChromaDB", "LangChain", "LangGraph", "AutoGen", "MCP", "A2A"] },
    { group: "ML", items: ["PyTorch", "TensorFlow", "LoRA fine-tuning", "Multimodal pipelines", "Evaluation & metrics"] },
    { group: "Infra", items: ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure", "GCP"] },
    { group: "On-device", items: ["Quantization", "Model conversion", "Mobile inference engine integration", "Offline execution"] }
  ]
};

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else node.setAttribute(k, v);
  }
  for (const c of children) node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  return node;
}

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  for (const p of DATA.projects) {
    const titleNode = p.titleLink
      ? el("a", { class: "project-title-link", href: p.titleLink, target: "_blank", rel: "noreferrer" }, [p.title])
      : el("span", {}, [p.title]);
    
    const top = el("div", { class: "project-top" }, [
      el("h3", {}, [titleNode]),
      el("div", { class: "badge" }, [p.badge])
    ]);

    const desc = el("p", { class: "desc" }, [p.desc]);

    const ul = el("ul", { class: "bullets" });
    for (const b of p.bullets) ul.appendChild(el("li", {}, [b]));

    const tags = el("div", { class: "tags" });
    for (const t of p.tags) tags.appendChild(el("span", { class: "tag" }, [t]));

    const actions = el("div", { class: "project-actions" }, []);
    if (p.links && p.links.repo) {
      actions.appendChild(el("a", { class: "pbtn", href: p.links.repo, target: "_blank", rel: "noreferrer" }, ["Repo"]));
    }
    if (p.links && p.links.demo) {
      actions.appendChild(el("a", { class: "pbtn", href: p.links.demo, target: "_blank", rel: "noreferrer" }, ["Demo"]));
    }

    const children = [top, desc, ul, tags];
    if (actions.childNodes.length > 0) children.push(actions);

    grid.appendChild(el("div", { class: "card project" }, children));
  }
}

function renderExperience() {
  const wrap = document.getElementById("experienceStack");
  for (const e of DATA.experience) {
    const row = el("div", { class: "row" }, [
      el("div", {}, [
        el("div", { class: "item-title" }, [e.title]),
        el("div", { class: "item-sub" }, [e.sub])
      ])
    ]);

    const ul = el("ul", { class: "bullets" });
    for (const b of e.bullets) ul.appendChild(el("li", {}, [b]));

    const tags = el("div", { class: "tags" });
    for (const t of e.tags) tags.appendChild(el("span", { class: "tag" }, [t]));

    wrap.appendChild(el("div", { class: "card" }, [row, ul, tags]));
  }
}

function renderSkills() {
  const wrap = document.getElementById("skillsWrap");
  for (const s of DATA.skills) {
    const list = el("div", { class: "skill-list" }, []);
    for (const i of s.items) list.appendChild(el("span", { class: "tag" }, [i]));

    wrap.appendChild(el("div", { class: "card skill-group" }, [
      el("div", { class: "item-title" }, [s.group]),
      list
    ]));
  }
}

function setupTheme() {
  const btn = document.getElementById("themeBtn");
  const key = "portfolio_theme";
  const saved = localStorage.getItem(key);
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  btn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "light" ? "" : "light";
    if (next) document.documentElement.setAttribute("data-theme", next);
    else document.documentElement.removeAttribute("data-theme");
    localStorage.setItem(key, next || "");
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
renderProjects();
renderExperience();
renderSkills();
setupTheme();
