import { Institution } from "@/models/institution";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type AlertType = {
  show: boolean;
  text: string;
  status: "info" | "success" | "error" | "warning";
};

export default function CrudPage() {
  const [institutions, setInstitutions] = useState([] as Institution[]);

  const [searchTerm, setSearchTerm] = useState("");

  const [alert, setAlert] = useState({
    show: false,
    text: "",
    status: "success",
  });

  const [formData, setFormData] = useState<Institution>({
    название_курирующего_учебного_заведения: "",
    адрес_курирующего_учебного_заведения: "",
    фио_ректора: "",
    номер_курирующего_учебного_заведения: "",
  });

  // useEffect(() => {
  //   fetchInstitutions();
  // }, []);

  const fetchInstitutions = async () => {
    try {
      const response = await fetch("/api/vuz/read");
      const data = await response.json();
      setInstitutions(data);
    } catch (error) {
      console.error("Error fetching institutions:", error);
    }
  };

  const handleOpenCreate = async () => {
    setFormData({
      ...formData,
      номер_курирующего_учебного_заведения: "",
    });

    document.getElementById("my_modal_1")!.showModal();
  };

  const searchInstitutions = async () => {
    try {
      const response = await fetch('/api/vuz/find', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ фио: searchTerm }),
      });
      const data = await response.json();
      setInstitutions(data);
    } catch (error) {
      console.error("Error searching institutions:", error);
    }
  };

  const handleDelete = async (номер?: string | null) => {
    try {
      await fetch("/api/vuz/delete", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ номер }),
      });
    } catch (error) {
      console.error("Error deleting institution:", error);
    }
  };

  const handleEdit = (institution: Institution) => {
    setFormData(institution);
    document.getElementById("my_modal_1")!.showModal();
  };

  const handleSubmit = async () => {
    try {
      let url = "/api/vuz/post";
      let method = "POST";
      if (formData.номер_курирующего_учебного_заведения) {
        url = "/api/vuz/put";
        method = "PUT";
      }
      const response = await fetch(url, {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setAlert({
          show: true,
          status: "error",
          text: "Объект уже присутствует в БД",
        });
        setTimeout(() => {
          setAlert({ ...alert, show: false });
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center">
        <button className="btn btn-info mr-36" onClick={handleOpenCreate}>
          Создать
        </button>
        <input
          type="text"
          placeholder="Введите ФИО ректора"
          className="input input-bordered mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={searchInstitutions}>
          Поиск
        </button>
      </div>

      {alert.show ? (
        <div
          id="alert"
          role="alert"
          className={`alert alert-${alert.status} bottom-2 right-2 fixed z-50 w-1/3`}
        >
          <span>{alert.text}.</span>
        </div>
      ) : (
        ""
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Адрес</th>
            <th>ФИО Ректора</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {institutions.map((institution) => (
            <tr key={institution.номер_курирующего_учебного_заведения}>
              <td>{institution.название_курирующего_учебного_заведения}</td>
              <td>{institution.адрес_курирующего_учебного_заведения}</td>
              <td>{institution.фио_ректора}</td>
              <td>
                <button
                  className="btn btn-circle btn-xs mr-2"
                  onClick={() => handleEdit(institution)}
                >
                  🪛
                </button>
                <button
                  className="btn btn-circle btn-xs"
                  onClick={() =>
                    handleDelete(
                      institution.номер_курирующего_учебного_заведения
                    )
                  }
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">
            {formData.номер_курирующего_учебного_заведения
              ? "РЕДАКТИРОВАНИЕ"
              : "ДОБАВЛЕНИЕ"}{" "}
            УНИВЕРСИТЕТА
          </h3>
          <div className="py-1 ">
            <label className="input input-bordered flex items-center my-2">
              Название:
              <input
                type="text"
                className="grow"
                placeholder="..."
                value={formData.название_курирующего_учебного_заведения || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    название_курирующего_учебного_заведения: e.target.value,
                  })
                }
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-2">
              Адрес:
              <input
                type="text"
                className="grow"
                placeholder="..."
                value={formData.адрес_курирующего_учебного_заведения || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    адрес_курирующего_учебного_заведения: e.target.value,
                  })
                }
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-2">
              ФИО Ректора:
              <input
                type="text"
                className="grow"
                placeholder="..."
                value={formData.фио_ректора || ""}
                onChange={(e) =>
                  setFormData({ ...formData, фио_ректора: e.target.value })
                }
              />
            </label>
            {/* {formData.номер_курирующего_учебного_заведения && (
              <label className="input input-bordered flex items-center gap-2 my-2">
                Номер:
                <input
                  type="text"
                  className="grow"
                  placeholder="Daisy"
                  value={formData.номер_курирующего_учебного_заведения}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      номер_курирующего_учебного_заведения: e.target.value,
                    })
                  }
                />
              </label>
            )} */}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary" onClick={handleSubmit}>
                {formData.номер_курирующего_учебного_заведения
                  ? "Изменить"
                  : "Создать"}
              </button>
              <button className="btn">Закрыть</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
