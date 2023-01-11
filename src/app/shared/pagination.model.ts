
export class  PaginationModel {
    currentPage: string="";
    hasNext: boolean=false;
    hasPrev: boolean=false;
    next: string="";
    pages: number=1;
    size: number=10;
    totalElements: number=0;
}
