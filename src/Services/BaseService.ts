export default class BaseService {
    constructor() {
    }

	public async SuccessData(data: any = null): Promise<any> {
		return { success: true, data: data};
	}

    public async ErrorData(error: string = null): Promise<any> {
		return { success: false, error: error ?? 'Erro interno do servidor.'};
	}
}