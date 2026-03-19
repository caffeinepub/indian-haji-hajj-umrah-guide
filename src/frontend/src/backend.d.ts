import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface RitualStep {
    day?: bigint;
    title: string;
    icon: string;
    description: string;
    stepNumber: bigint;
    stepType: StepType;
    duaId?: bigint;
}
export interface PdfFlipbook {
    url: ExternalBlob;
    name: string;
    pageCount: bigint;
}
export interface UserProgress {
    completedUmrahSteps: Array<bigint>;
    completedHajjSteps: Array<bigint>;
}
export interface Dua {
    id: bigint;
    hindiMeaning: string;
    hindiTransliteration: string;
    name: string;
    arabic: string;
    category: StepType;
}
export enum StepType {
    hajj = "hajj",
    umrah = "umrah"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addDua(name: string, arabic: string, hindiTransliteration: string, hindiMeaning: string, category: StepType): Promise<bigint>;
    addFlipbook(name: string, url: ExternalBlob, pageCount: bigint): Promise<void>;
    addRitualStep(step: RitualStep): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllDuas(): Promise<Array<Dua>>;
    getAllFlipbooks(): Promise<Array<PdfFlipbook>>;
    getAllRitualSteps(): Promise<Array<RitualStep>>;
    getCallerUserRole(): Promise<UserRole>;
    getDua(id: bigint): Promise<Dua | null>;
    getFlipbook(name: string): Promise<PdfFlipbook | null>;
    getRitualStep(stepNumber: bigint): Promise<RitualStep | null>;
    getUserProgress(user: Principal): Promise<UserProgress | null>;
    isCallerAdmin(): Promise<boolean>;
    searchDuasByCategory(category: StepType): Promise<Array<Dua>>;
    searchRitualStepsByType(stepType: StepType): Promise<Array<RitualStep>>;
    updateUserProgress(progress: UserProgress): Promise<void>;
}
