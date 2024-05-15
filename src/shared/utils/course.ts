import type { PointCategory } from '@/types/common.interface';
import type { CoursePart, OriginCourse, RequiredCourse, CourseChapter } from '@/types/course.interface';
import type { BridgeEnrollment, Enrollment } from '@/types/enrollment.interface';
import type { BridgeProduct, Product } from '@/types/product.interface';

export const getPartContentIdList = (part: CoursePart) => {
  if (part.CHAPTER?.length) {
    return part.CHAPTER.map((chapter) => {
      return chapter.CONTENT.map((content) => content.courseContentId);
    }).flat();
  }
  if (part.CONTENT?.length) {
    return part.CONTENT.map((content) => content.courseContentId);
  }

  return [];
};

export const isRequiredCourse = (course: OriginCourse) => {
  if (!course.requiredCourse || !course.requiredCourse.extras) return false;

  const currentTime = Date.now();
  const { requiredCourseStartedAt, requiredCourseEndedAt } = course.requiredCourse.extras;

  return (
    currentTime >= new Date(requiredCourseStartedAt).getTime() &&
    currentTime <= new Date(requiredCourseEndedAt).getTime()
  );
};

interface CoursePoint {
  learning: number;
  exam: number;
  task: number;
  total: number;
}

export const isCompletedCourse = (coursePoints: CoursePoint, criteriaForCompletion: PointCategory) => {
  const learningScoreIsCompleted = coursePoints.learning >= criteriaForCompletion.progress;
  const examIsCompleted = coursePoints.exam >= criteriaForCompletion.exam;
  const taskIsCompleted = coursePoints.task >= criteriaForCompletion.task;
  const totalScoreIsCompleted = coursePoints.total >= criteriaForCompletion.total;

  return learningScoreIsCompleted && examIsCompleted && taskIsCompleted && totalScoreIsCompleted;
};

export const getCourseEnrollmentState = (
  course?: OriginCourse,
  product?: Product,
  enrollment?: Enrollment | BridgeEnrollment,
  requiredCourse?: RequiredCourse
) => {
  const enrollmentState = enrollment ? enrollment.state : course?.enrollment?.state;
  const productData = product ?? course?.product;
  const today = new Date();
  const courseStartedAt = new Date(productData?.extras.courseStartedAt || -1);
  const courseEndedAt = new Date(productData?.extras.courseEndedAt || -1);
  const enrollmentStartedAt = new Date(productData?.extras.enrollmentStartedAt || -1);
  const enrollmentEndedAt = new Date(productData?.extras.enrollmentEndedAt || -1);
  const contractEndAt = new Date(course?.extras.contractEndAt || -1);

  const isAvailableCoursePeriod = courseStartedAt <= today && today <= courseEndedAt;
  const isAvailableEnrollmentPeriod = enrollmentStartedAt <= today && today <= enrollmentEndedAt;
  const isAvailableContractPeriod = contractEndAt >= today;

  const isRequiredCourse = requiredCourse ?? course?.requiredCourse;

  const isEnrollableCourse =
    isAvailableEnrollmentPeriod && (!enrollmentState || enrollmentState === 'PENDING') && isAvailableContractPeriod;
  const isEnrollmentApplying = isAvailableEnrollmentPeriod && enrollmentState === 'APPLYING';
  const isEnrollmentCancel =
    isAvailableEnrollmentPeriod &&
    !isRequiredCourse &&
    productData?.extras.isEnrollmentCancel &&
    (enrollmentState === 'APPLYING' || enrollmentState === 'COMPLETED');

  const courseState = course?.state;
  const productState = productData?.state;

  const isOngoingCourse =
    isAvailableCoursePeriod &&
    enrollmentState === 'COMPLETED' &&
    courseState !== 'DELETED' &&
    productState !== 'DELETED';

  return {
    isOngoingCourse,
    isEnrollmentApplying,
    isEnrollmentCancel,
    isEnrollableCourse,
  };
};

export const getChapterPlaytime = (chapter: CourseChapter): number => {
  return chapter.CONTENT?.reduce((playtime, content) => {
    playtime += content.playTime || 0;
    return playtime;
  }, 0);
};

export const getPartPlaytime = (part: CoursePart): number => {
  let playTime = 0;
  if (part.CHAPTER) {
    part.CHAPTER.forEach((chapter) => {
      playTime += getChapterPlaytime(chapter);
    });
  }
  if (part.CONTENT) {
    part.CONTENT.forEach((content) => {
      playTime += content.playTime || 0;
    });
  }
  return playTime;
};

export const isCourseContractEndAtIncludeEnrollmentPeriod = (
  productList: BridgeProduct[] | Product[],
  courseContractEndAt: string
) => {
  const contractEndAt = new Date(courseContractEndAt);

  return productList.some((product) => {
    const productEnrollmentStartAt = new Date(product.extras.enrollmentStartedAt || -1);
    const productEnrollmentEndAt = new Date(product.extras.enrollmentEndedAt || -1);
    return productEnrollmentStartAt <= contractEndAt && contractEndAt <= productEnrollmentEndAt;
  });
};
