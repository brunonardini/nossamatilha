import type { StaticImageData } from 'next/image';
import bagFoodRoom from '@/assets/photos/boarding-guide/bag-food-room.webp';
import dayAfternoonPlay from '@/assets/photos/boarding-guide/day-afternoon-play.webp';
import dayAfternoonRest from '@/assets/photos/boarding-guide/day-afternoon-rest.webp';
import dayMorningFeeding from '@/assets/photos/boarding-guide/day-morning-feeding.webp';
import dayMorningYard from '@/assets/photos/boarding-guide/day-morning-yard.webp';
import dayNightOwnBeds from '@/assets/photos/boarding-guide/day-night-own-beds.webp';
import dayNightSharedBed from '@/assets/photos/boarding-guide/day-night-shared-bed.webp';
import goodbyeHappyDog from '@/assets/photos/boarding-guide/goodbye-happy-dog.webp';
import goodbyeSilviaAndBacon from '@/assets/photos/boarding-guide/goodbye-silvia-and-bacon.webp';
import groomingBath from '@/assets/photos/boarding-guide/grooming-bath.webp';
import groomingRoom from '@/assets/photos/boarding-guide/grooming-room.webp';
import heroDogsOfAllSizes from '@/assets/photos/boarding-guide/hero-dogs-of-all-sizes.webp';
import socializationSizes from '@/assets/photos/boarding-guide/socialization-sizes.webp';
import spaceDaycareCovered from '@/assets/photos/boarding-guide/space-daycare-covered.webp';
import spaceDaycareLawn from '@/assets/photos/boarding-guide/space-daycare-lawn.webp';
import spaceKennelCorridor from '@/assets/photos/boarding-guide/space-kennel-corridor.webp';
import teamGroup from '@/assets/photos/boarding-guide/team-group.webp';
import teamSilviaAndBacon from '@/assets/photos/boarding-guide/team-silvia-and-bacon.webp';

/** A photo of the boarding guide with its pt-BR alt text. */
export type GuidePhoto = {
  src: StaticImageData;
  alt: string;
};

/**
 * Photos of the boarding guide, keyed by use. Masters are 4:5 WebP without
 * metadata (see docs/photo-selection.md); `next/image` serves the optimized
 * sizes. Static imports give width, height and a blur placeholder.
 */
export const guidePhotos = {
  heroDogsOfAllSizes: {
    src: heroDogsOfAllSizes,
    alt: 'Quatro cães de tamanhos diferentes sentados no gramado, de frente para a câmera.',
  },
  spaceDaycareLawn: {
    src: spaceDaycareLawn,
    alt: 'Área externa da creche, com corredor coberto e um gramado verde sob o céu azul.',
  },
  spaceDaycareCovered: {
    src: spaceDaycareCovered,
    alt: 'Área coberta da creche, com piso emborrachado e grade de proteção.',
  },
  spaceKennelCorridor: {
    src: spaceKennelCorridor,
    alt: 'Corredor dos quartos de descanso, onde os cães hospedados dormem.',
  },
  socializationSizes: {
    src: socializationSizes,
    alt: 'Um cão branco de porte grande junto de cães pequenos na área coberta.',
  },
  teamSilviaAndBacon: {
    src: teamSilviaAndBacon,
    alt: 'Silvia Matrumoto, CEO da Nossa Matilha, sorrindo rosto a rosto com o Bacon.',
  },
  teamGroup: {
    src: teamGroup,
    alt: 'Equipe da Nossa Matilha reunida, sorrindo ao lado de um cão preto.',
  },
  dayMorningYard: {
    src: dayMorningYard,
    alt: 'Cães no gramado pela manhã, entre cones de atividade.',
  },
  dayMorningFeeding: {
    src: dayMorningFeeding,
    alt: 'Uma pessoa da equipe serve ração para um cão.',
  },
  dayAfternoonPlay: {
    src: dayAfternoonPlay,
    alt: 'Dois cães brincando juntos no gramado.',
  },
  dayAfternoonRest: {
    src: dayAfternoonRest,
    alt: 'Cães descansando tranquilos na área coberta da creche.',
  },
  dayNightSharedBed: {
    src: dayNightSharedBed,
    alt: 'Dois cães deitados juntos numa caminha grande no quarto de descanso.',
  },
  dayNightOwnBeds: {
    src: dayNightOwnBeds,
    alt: 'Dois cães, cada um na sua caminha, no quarto de descanso.',
  },
  bagFoodRoom: {
    src: bagFoodRoom,
    alt: 'Sala de preparo da alimentação, com as rações e os potes organizados.',
  },
  groomingBath: {
    src: groomingBath,
    alt: 'Cão tomando banho na sala de banho e tosa.',
  },
  groomingRoom: {
    src: groomingRoom,
    alt: 'Sala de banho e tosa, com banheiras e secadores.',
  },
  goodbyeSilviaAndBacon: {
    src: goodbyeSilviaAndBacon,
    alt: 'Silvia e o Bacon tirando uma selfie juntos ao ar livre.',
  },
  goodbyeHappyDog: {
    src: goodbyeHappyDog,
    alt: 'Golden retriever sorridente sentado no gramado, com uma bolinha verde.',
  },
} as const satisfies Record<string, GuidePhoto>;
