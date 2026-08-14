/* ============================================================
   Contenido detallado de la galería de proyectos (modal)
   ============================================================ */

const projectsData = {
  biopagos: {
    es: {
      title: "Panel Administrativo — Biopagos",
      subtitle: "Backend · Plataforma administrativa web",
      description: "Diseñé e implementé un panel administrativo desarrollado en .NET, con operaciones CRUD completas para la gestión de usuarios. La lógica backend está conectada a una base de datos SQL Server, dando soporte a la administración diaria de la plataforma.",
      role: "Rol: Desarrollo backend individual dentro del equipo técnico.",
      tech: [".NET", "SQL Server", "MVC", "CRUD", "C#"]
    },
    en: {
      title: "Admin Panel — Biopagos",
      subtitle: "Backend · Administrative web platform",
      description: "I designed and implemented an admin panel built in .NET, with complete CRUD operations for user management. The backend logic connects to a SQL Server database, supporting the platform's day-to-day administration.",
      role: "Role: Individual backend development within the technical team.",
      tech: [".NET", "SQL Server", "MVC", "CRUD", "C#"]
    }
  },
  conectada: {
    es: {
      title: "Comunidad Conectada",
      subtitle: "Seguridad · Aplicación web segura",
      description: "Aplicación web enfocada en la seguridad de la información: implementé un sistema de autenticación (login) con validación segura y control de accesos, además de participar en la identificación y mitigación de brechas de seguridad en la aplicación.",
      role: "Rol: Desarrollo y análisis de seguridad.",
      tech: ["Java", "Autenticación", "Login", "Seguridad"]
    },
    en: {
      title: "Comunidad Conectada",
      subtitle: "Security · Secure web application",
      description: "A web application focused on information security: I implemented a login authentication system with secure validation and access control, and took part in identifying and mitigating security breaches in the application.",
      role: "Role: Development and security analysis.",
      tech: ["Java", "Authentication", "Login", "Security"]
    }
  },
  automatizacion: {
    es: {
      title: "Automatización de Procesos Administrativos",
      subtitle: "Automatización · Trabajo freelance (2024 – actualidad)",
      description: "Proyecto freelance continuo enfocado en la digitalización y automatización de flujos de trabajo para clientes independientes, mediante herramientas de Microsoft 365. Incluye gestión y análisis de datos, y el diseño de procesos eficientes para reducir tareas manuales repetitivas.",
      role: "Rol: Analista y desarrolladora freelance.",
      tech: ["Microsoft 365", "Excel avanzado", "Automatización"]
    },
    en: {
      title: "Administrative Process Automation",
      subtitle: "Automation · Freelance work (2024 – present)",
      description: "An ongoing freelance project focused on digitizing and automating workflows for independent clients using Microsoft 365 tools. It includes data management and analysis, and designing efficient processes to reduce repetitive manual tasks.",
      role: "Role: Freelance analyst and developer.",
      tech: ["Microsoft 365", "Advanced Excel", "Automation"]
    }
  },
  mercadito: {
    es: {
      title: "Administración y Control de Datos",
      subtitle: "Datos · Mercadito Gastronómico (2022 – 2024)",
      description: "Implementé un sistema de control de inventarios con seguimiento de datos en tiempo real, junto con la gestión de reportes operativos y el apoyo en la toma de decisiones basada en datos. Este proyecto sentó las bases de mi interés por la automatización y el análisis técnico que aplico hoy en desarrollo de software.",
      role: "Rol: Administración y control de datos.",
      tech: ["Control de inventarios", "Reportes", "Análisis de datos"]
    },
    en: {
      title: "Data Administration & Control",
      subtitle: "Data · Mercadito Gastronómico (2022 – 2024)",
      description: "I implemented an inventory control system with real-time data tracking, along with the management of operational reports and support for data-driven decision-making. This project laid the foundation for my interest in automation and technical analysis, which I now apply in software development.",
      role: "Role: Data administration and control.",
      tech: ["Inventory control", "Reporting", "Data analysis"]
    }
  }
};

let openProjectId = null;

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  modal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;
    const projectId = button.getAttribute("data-project");
    openProjectId = projectId;
    renderProjectModal(projectId);
  });
});

function renderProjectModal(projectId){
  const data = projectsData[projectId];
  if (!data) return;
  const lang = (typeof currentLang !== "undefined") ? currentLang : "es";
  const content = data[lang] || data.es;

  document.getElementById("projectModalLabel").textContent = content.title;

  const techTags = content.tech.map(t => `<span>${t}</span>`).join("");
  document.getElementById("projectModalBody").innerHTML = `
    <p class="project-tag mb-2">${content.subtitle}</p>
    <p style="color:var(--c-text-muted); font-size:.95rem;">${content.description}</p>
    <p style="color:var(--c-text-dim); font-size:.85rem; font-style:italic;">${content.role}</p>
    <div class="project-tech mt-3">${techTags}</div>
  `;
}

/** Llamada por i18n.js cuando cambia el idioma, para refrescar el modal si está abierto */
function refreshDynamicContent(lang){
  if (openProjectId) {
    renderProjectModal(openProjectId);
  }
}
