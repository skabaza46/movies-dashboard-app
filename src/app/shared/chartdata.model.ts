
export interface Datasets {
    label: string;
    data: string[] | number[];
    backgroundColor: string[];
}

export interface ChartData {
    labels: string[];
    backgroundColor: string;
    datasets: Datasets[]
  }