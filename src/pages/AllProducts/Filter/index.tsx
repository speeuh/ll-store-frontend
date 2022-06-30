import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Filter.module.scss";
import classNames from "classnames";


interface Props {
  filtro: string | null;
  setFiltro: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Filtros({ filtro, setFiltro }: Props) {
  
  const [sections, setSections] = useState<Record<any, any>>([]);

  useEffect(() => {
    const teste = async () => {
      const { data } = await axios.get("http://localhost:8080/products/list");
      setSections(data);
    };
    teste();
  }, []);
  
    

    function selecionarFiltro(item) {
      if (filtro === item.section.id) return setFiltro(null);
      return setFiltro(item.section.name);
    }
    
  return (
    <div className={styles.filtros}>{sections.map((item) => (
      <button
      key={item.section.id}
      onClick={() => selecionarFiltro(item)}>
          
        {item.section.name}
      </button>
    ))}
    </div>
  );
    }
