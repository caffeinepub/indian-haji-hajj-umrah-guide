import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type Dua,
  ExternalBlob,
  type PdfFlipbook,
  type RitualStep,
  StepType,
  type UserProgress,
} from "../backend";
import { useActor } from "./useActor";

export function useGetAllDuas() {
  const { actor, isFetching } = useActor();
  return useQuery<Dua[]>({
    queryKey: ["duas"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDuas();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUmrahSteps() {
  const { actor, isFetching } = useActor();
  return useQuery<RitualStep[]>({
    queryKey: ["umrahSteps"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchRitualStepsByType(StepType.umrah);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetHajjSteps() {
  const { actor, isFetching } = useActor();
  return useQuery<RitualStep[]>({
    queryKey: ["hajjSteps"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchRitualStepsByType(StepType.hajj);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFlipbooks() {
  const { actor, isFetching } = useActor();
  return useQuery<PdfFlipbook[]>({
    queryKey: ["flipbooks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllFlipbooks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddFlipbook() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      file,
      pageCount,
    }: { name: string; file: File; pageCount: number }) => {
      if (!actor) throw new Error("Not connected");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      await actor.addFlipbook(name, blob, BigInt(pageCount));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["flipbooks"] }),
  });
}

export function useUpdateProgress() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (progress: UserProgress) => {
      if (!actor) return;
      await actor.updateUserProgress(progress);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["progress"] }),
  });
}
